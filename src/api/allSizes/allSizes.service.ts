import xlsx from 'node-xlsx';
import SizeChartShoes from '../sizeChartShoes/sizeChartShoes.service';

class AllSizes {
  generatePDF = () => {
    //
  };

  shoesService = new SizeChartShoes();

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
