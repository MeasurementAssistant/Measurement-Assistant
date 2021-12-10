/* eslint-disable @typescript-eslint/no-explicit-any */
import ExcelJS from 'exceljs';
import SizeChartShoes from '../sizeChartShoes/sizeChartShoes.service';
import SizeChartClothes from '../sizeChartClothes/sizeChartClothes.service';
import BodyType from '../bodyType/bodyType.service';

class AllSizes {
  generatePDF = () => {
    //
  };

  shoesService = new SizeChartShoes();
  clothesService = new SizeChartClothes();
  bodyTypeService = new BodyType();

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
        name: key
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
        name: key
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
