import HttpError from '../../errors/httpErrors';
import { sizeChartShoesData } from '../../data/data';

class SizeChartShoes {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSizeChartforCmFootLength(footLengthCm: number): { [key: string]: number | string } {
    try {
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
