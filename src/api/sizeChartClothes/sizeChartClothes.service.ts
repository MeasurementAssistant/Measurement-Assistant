/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpError from '../../errors/httpErrors';
import { sizeChartClothesData } from '../../data/data';

class SizeChartClothes {
  getSizeChartClothesforCm(
    waistCm: number,
    hipsCm: number,
    bustCm: number
  ): { [key: string]: number | string } {
    try {
      //запрос
      const sizeResult: { [key: string]: number | string } = sizeChartClothesData[0]; //
      if (sizeResult) {
        return sizeResult;
      }
      return {
        EU: 0,
        UK: 0,
        USA: 0,
        SexID: 'not found',
        International: 0,
        BustCm: 0,
        BustIn: 0,
        WaistCm: 0,
        WaistIn: 0,
        HipsCm: 0,
        HipsIn: 0
      };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  getSizeChartClothesforIn(
    waistIn: number,
    hipsIn: number,
    bustIn: number
  ): { [key: string]: number | string } {
    try {
      //запрос
      const sizeResult: { [key: string]: number | string } = sizeChartClothesData[0];
      if (sizeResult) {
        return sizeResult;
      }
      return {
        EU: 0,
        UK: 0,
        USA: 0,
        SexID: 'not found',
        International: 0,
        BustCm: 0,
        BustIn: 0,
        WaistCm: 0,
        WaistIn: 0,
        HipsCm: 0,
        HipsIn: 0
      };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartClothes;
