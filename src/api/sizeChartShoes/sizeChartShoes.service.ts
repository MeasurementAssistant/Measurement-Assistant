/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpError from '../../errors/httpErrors';
import { sizeChartShoesData } from '../../data/data';
import { getAdidasSizeChart } from '../../services/parser';

class SizeChartShoes {
  private sizeNF: { [key: string]: number | string } = {
    UK: 0,
    USA: 0,
    EU: 0,
    Sex: 'not found',
    cm: 0,
    in: 0
  };

  getSizeChartforCmFootLength(
    footLengthCm: number,
    sex: string
  ): { [key: string]: number | string } {
    try {
      //TODO: запрос по footlength cm и sex
      const sizeResult: { [key: string]: number | string } = sizeChartShoesData[0];
      if (sizeResult) {
        return sizeResult;
      }
      return this.sizeNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  getSizeChartforInFootLength(
    footLengthIn: number,
    sex: string
  ): { [key: string]: number | string } {
    try {
      //TODO:запрос по footlength in
      const sizeResult: { [key: string]: number | string } = sizeChartShoesData[0];
      if (sizeResult) {
        return sizeResult;
      }
      return this.sizeNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  async getSizeChartAdidas(
    footLengthCm: number,
    sex: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      const sizes: Array<{ [key: string]: number | string }> = await getAdidasSizeChart();
      let sizeResult: { [key: string]: number | string } = {};

      if (sizes) {
        for (let index = 0; index <= sizes.length - 2; index++) {
          if (footLengthCm > sizes[index].cm && footLengthCm <= sizes[index + 1].cm) {
            sizeResult = sizes[index + 1];
          }
        }
      }
      if (sizeResult && Object.keys(sizeResult).length) {
        return {
          RU: sizeResult.RU,
          EU: sizeResult.EU,
          UK: sizeResult.UK,
          USA: sex == 'male' ? sizeResult.USmale : sizeResult.USfemale,
          Sex: sex,
          cm: sizeResult.cm
        };
      }
      return {
        RU: 0,
        EU: 0,
        UK: 0,
        USA: 0,
        Sex: 'not found',
        cm: 0
      };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartShoes;
