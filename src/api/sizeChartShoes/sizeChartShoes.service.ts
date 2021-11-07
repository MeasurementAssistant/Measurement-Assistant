/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpError from '../../errors/httpErrors';
import { sizeChartShoesData } from '../../data/data';

class SizeChartShoes {
  getSizeChartforCmFootLength(footLengthCm: number): { [key: string]: number | string } {
    try {
      //запрос по footlength cm
      const sizeResult: { [key: string]: number | string } = sizeChartShoesData[0];
      if (sizeResult) {
        return sizeResult;
      }
      return {
        UK: 'not found',
        USA: 'not found',
        EU: 'not found',
        SexID: 'not found',
        cm: 'not found',
        in: 'not found'
      };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  getSizeChartforInFootLength(footLengthIn: number): { [key: string]: number | string } {
    try {
      //запрос по footlength in
      const sizeResult: { [key: string]: number | string } = sizeChartShoesData[0];
      if (sizeResult) {
        return sizeResult;
      }
      return {
        UK: 'not found',
        USA: 'not found',
        EU: 'not found',
        SexID: 'not found',
        cm: 'not found',
        in: 'not found'
      };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartShoes;
