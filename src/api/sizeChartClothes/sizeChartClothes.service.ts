/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpError from '../../errors/httpErrors';
import { sizeChartClothesData } from '../../data/data';
import { getAdidasSizeChart, getReebokSizeChart } from '../../services/parser';

class SizeChartClothes {
  private sizeNF: { [key: string]: number | string } = {
    EU: 0,
    UK: 0,
    USA: 0,
    Sex: 'not found',
    International: 0,
    BustCm: 0,
    BustIn: 0,
    WaistCm: 0,
    WaistIn: 0,
    HipsCm: 0,
    HipsIn: 0
  };
  private sizeARNF: { [key: string]: number | string } = {
    RU: 0,
    EU: 0,
    BustCm: 0,
    WaistCm: 0,
    HipsCm: 0,
    Sex: 'not found'
  };

  getSizeChartClothesforCm(
    waistCm: number,
    hipsCm: number,
    bustCm: number,
    sex: string
  ): { [key: string]: number | string } {
    try {
      //TODO запрос
      const sizeResult: { [key: string]: number | string } = sizeChartClothesData[0]; //
      if (sizeResult) {
        return sizeResult;
      }
      return this.sizeNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  getSizeChartClothesforIn(
    waistIn: number,
    hipsIn: number,
    bustIn: number,
    sex: string
  ): { [key: string]: number | string } {
    try {
      //TODO запрос
      const sizeResult: { [key: string]: number | string } = sizeChartClothesData[0];
      if (sizeResult) {
        return sizeResult;
      }
      return this.sizeNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  async getSizeChartReebokClothes(
    waistCm: number,
    hipsCm: number,
    bustCm: number,
    sex: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      const sizes: Array<{ [key: string]: number | string }> = await getReebokSizeChart('clothes');
      let sizeResult: { [key: string]: number | string } = {};

      if (sizes) {
        for (let index = 0; index <= sizes.length - 2; index++) {
          if (
            sizes[index].Sex == sex &&
            bustCm > sizes[index].BustCm &&
            bustCm <= sizes[index + 1].BustCm &&
            waistCm > sizes[index].WaistCm &&
            waistCm <= sizes[index + 1].WaistCm &&
            hipsCm > sizes[index].HipsCm &&
            hipsCm <= sizes[index + 1].HipsCm
          ) {
            sizeResult = sizes[index + 1];
          }
        }
      }

      if (sizeResult && Object.keys(sizeResult).length) {
        return sizeResult;
      }
      return this.sizeARNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartClothes;
