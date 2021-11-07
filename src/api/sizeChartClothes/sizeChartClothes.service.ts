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
        EU: 'not found',
        UK: 'not found',
        USA: 'not found',
        SexID: 'not found',
        International: 'not found',
        BustCm: 'not found',
        BustIn: 'not found',
        WaistCm: 'not found',
        WaistIn: 'not found',
        HipsCm: 'not found',
        HipsIn: 'not found'
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
        EU: 'not found',
        UK: 'not found',
        USA: 'not found',
        SexID: 'not found',
        International: 'not found',
        BustCm: 'not found',
        BustIn: 'not found',
        WaistCm: 'not found',
        WaistIn: 'not found',
        HipsCm: 'not found',
        HipsIn: 'not found'
      };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartClothes;
