/* eslint-disable @typescript-eslint/no-explicit-any */
import ExcelJS from 'exceljs';
import SizeChartShoes from '../sizeChartShoes/sizeChartShoes.service';
import SizeChartClothes from '../sizeChartClothes/sizeChartClothes.service';
import BodyType from '../bodyType/bodyType.service';
import path from 'path';
import * as fs from 'fs/promises';
import { jsPDF } from 'jspdf';
import { tableHeaders } from './tableHeaders';
import { configureI18n } from '../../i18n.config';

const [i18nObj] = configureI18n(false);

class AllSizes {
  private shoesService = new SizeChartShoes();
  private clothesService = new SizeChartClothes();
  private bodyTypeService = new BodyType();

  async generatePDF(
    bustSize: number,
    waistSize: number,
    hipsSize: number,
    footLength: number,
    sex: string,
    unit: string,
    lang?: string
  ): Promise<Buffer> {
    if (lang) {
      i18nObj.setLocale(lang);
    }
    const shoes: { [key: string]: string | number } = await this.shoesService.getSizeChart(
      footLength,
      sex,
      unit
    );
    const shoesData: { [key: string]: string } = this.beatifyCells(shoes);

    const clothes: { [key: string]: string | number } =
      await this.clothesService.getSizeChartClothes(waistSize, hipsSize, bustSize, sex, unit);
    const clothesData: { [key: string]: string } = this.beatifyCells(clothes);

    const bodyTypeData: { [key: string]: string } = this.bodyTypeService.getBodyTypeforMeasurements(
      bustSize,
      waistSize,
      hipsSize,
      sex,
      unit,
      true
    );

    const footBuffer = await this.imgBuffer('footLength');
    const bodyMeasure =
      sex == 'female' ? await this.imgBuffer('woman') : await this.imgBuffer('man');
    const shapeBuffer = await this.shapeImgBuffer(bodyTypeData.bodyTypeEn, sex);

    const doc = new jsPDF();

    doc.addImage(footBuffer, 'PNG', 10, 10, 70, 70);
    doc.text(`${footLength} ${unit}`, 33, 85);
    console.log(i18nObj.__('size.shoes'));
    doc.text(i18nObj.__('size.shoes'), 100, 25);
    doc.text(i18nObj.__('size.clothes'), 165, 105);
    doc.table(100, 30, [shoesData], Object.keys(shoesData), { fontSize: 12, autoSize: true });

    doc.addImage(bodyMeasure, 'PNG', 10, 105, 50, 120);
    doc.setFontSize(12);
    doc.table(123, 110, [clothesData], Object.keys(clothesData).slice(0, 5), {
      fontSize: 12,
      autoSize: true
    });
    doc.table(60, 135, [clothesData], Object.keys(clothesData).slice(5), {
      fontSize: 12,
      autoSize: true
    });
    doc.setTextColor('#FFFFFF');
    doc.setFontSize(10);
    doc.text(`${bustSize} ${unit}`, 32, 140);
    doc.text(`${waistSize} ${unit}`, 32, 151);
    doc.text(`${hipsSize} ${unit}`, 32, 162);

    doc.addImage(shapeBuffer, 'PNG', 150, 215, 45, 80);
    doc.setTextColor('#000000');
    doc.setFontSize(12);
    doc.text(i18nObj.__('bodyType.name') + `: ${bodyTypeData.bodyType}`, 45, 240);
    doc.text(i18nObj.__('description.name') + `: ${bodyTypeData.description}`, 45, 250, {
      maxWidth: 100
    });

    return Buffer.from(doc.output('arraybuffer'));
  }

  private beatifyCells(data: { [key: string]: string | number }) {
    const temp: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(data)) {
      temp[tableHeaders[key]] = value.toString();
    }
    return temp;
  }

  private async imgBuffer(name: string) {
    const imgPath = path.resolve(
      __dirname,
      path.join(process.cwd(), 'assets', 'img', `${name}.png`)
    );
    return await fs.readFile(imgPath);
  }

  private async shapeImgBuffer(bodyType: string, sex: string) {
    console.log(i18nObj);
    console.log(i18nObj.getCatalog(`bodyType.${bodyType}`));
    console.log(i18nObj.getCatalog());

    const bodyTypeNew = bodyType == 'Mixed Shape' ? 'question' : bodyType;
    const imgPath = path.resolve(
      __dirname,
      path.join(process.cwd(), 'assets', 'img', `${sex}${bodyTypeNew.replace(/\s/g, '')}.png`)
    );
    return await fs.readFile(imgPath);
  }

  async generateXLSXfile(
    bustSize: number,
    waistSize: number,
    hipsSize: number,
    footLength: number,
    sex: string,
    unit: string
  ): Promise<Buffer> {
    const shoesData = await this.shoesService.getSizeChart(footLength, sex, unit);
    const clothesData = await this.clothesService.getSizeChartClothes(
      waistSize,
      hipsSize,
      bustSize,
      sex,
      unit
    );
    const bodyTypeData = await this.bodyTypeService.getBodyTypeforMeasurements(
      waistSize,
      hipsSize,
      bustSize,
      sex,
      unit
    );
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');

    sheet.addTable({
      name: 'Shoes',
      ref: 'A1',
      headerRow: true,
      style: {
        theme: 'TableStyleLight2',
        showRowStripes: true
      },
      columns: Object.keys(shoesData).map((key) => ({
        name: tableHeaders[key]
      })),
      rows: [Object.values(shoesData)]
    });

    sheet.addTable({
      name: 'Clothes',
      ref: 'A4',
      headerRow: true,
      style: {
        theme: 'TableStyleLight2',
        showRowStripes: true
      },
      columns: Object.keys(clothesData).map((key) => ({
        name: tableHeaders[key]
      })),
      rows: [Object.values(clothesData)]
    });

    sheet.addTable({
      name: 'BodyType',
      ref: 'A7',
      headerRow: true,
      style: {
        theme: 'TableStyleLight2',
        showRowStripes: true
      },
      columns: [{ name: Object.keys(bodyTypeData)[0] }],
      rows: [[bodyTypeData.bodyType]]
    });

    sheet.eachRow(function (Row) {
      Row.eachCell(function (Cell) {
        Cell.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        };
      });
    });

    const buffer: any = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
export default AllSizes;
