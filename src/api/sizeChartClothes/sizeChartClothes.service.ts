/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpError from '../../errors/httpErrors';
import { sizeChartClothesData } from '../../data/data';

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
}

export default SizeChartClothes;
