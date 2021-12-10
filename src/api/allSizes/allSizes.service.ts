import path from 'path';
import * as fs from 'fs/promises';
import { jsPDF } from 'jspdf';
import xlsx from 'node-xlsx';
import SizeChartShoes from '../sizeChartShoes/sizeChartShoes.service';
import SizeChartClothes from '../sizeChartClothes/sizeChartClothes.service';
import BodyType from '../bodyType/bodyType.service';
import { tableHeaders } from './tableHeaders';

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
    unit: string
  ): Promise<Buffer> {
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
      unit
    );

    const footBuffer = await this.imgBuffer('footLength');
    const bodyMeasure =
      sex == 'female' ? await this.imgBuffer('woman') : await this.imgBuffer('man');
    const shapeBuffer = await this.shapeImgBuffer(bodyTypeData.bodyType, sex);

    const doc = new jsPDF();

    doc.addImage(footBuffer, 'PNG', 10, 10, 70, 70);
    doc.text(`${footLength} ${unit}`, 33, 85);
    doc.text(`Shoes size`, 100, 25);
    doc.text(`Clothes size`, 165, 105);
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
    doc.text(`Body Type: ${bodyTypeData.bodyType}`, 45, 240);
    doc.text(`Description: ${bodyTypeData.description}`, 45, 250, { maxWidth: 100 });

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
    const bodyTypeNew = bodyType == 'You have mixed body type' ? 'question' : bodyType;
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
  ): Promise<ArrayBuffer> {
    const shoesData = await this.shoesService.getSizeChart(footLength, sex, unit);
    const columnNames: Array<string> = Object.keys(shoesData);
    const columnValues: Array<string | number> = Object.values(shoesData);
    return xlsx.build([{ name: 'mySheetName', data: [columnNames, columnValues] }]);
  }
}
export default AllSizes;
