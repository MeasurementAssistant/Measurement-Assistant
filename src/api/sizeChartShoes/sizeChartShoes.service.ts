/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpError from '../../errors/httpErrors';
import { sizeChartShoesData } from '../../data/data';
import { getAdidasSizeChartShoes, getReebokSizeChart } from '../../services/parser';

class SizeChartShoes {
  private sizeNF: { [key: string]: number | string } = {
    UK: 0,
    USA: 0,
    EU: 0,
    Sex: 'not found',
    cm: 0,
    in: 0
  };
  private sizeARNF: { [key: string]: number | string } = {
    RU: 0,
    EU: 0,
    UK: 0,
    USA: 0,
    Sex: 'not found',
    cm: 0
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

  async getSizeChartAdidasShoes(
    footLengthCm: number,
    sex: string
  ): Promise<{ [key: string]: number | string | { [key: string]: number } }> {
    try {
      const sizes: Array<{ [key: string]: number | string | { [key: string]: number } }> =
        await getAdidasSizeChartShoes();
      let sizeResult: { [key: string]: number | string | { [key: string]: number } } = {};

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
      return this.sizeARNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  async getSizeChartReebokShoes(
    footLengthCm: number,
    sex: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      const sizes: Array<{ [key: string]: number | string }> = await getReebokSizeChart('shoes');
      let sizeResult: { [key: string]: number | string } = {};

      if (sizes) {
        for (let index = 0; index <= sizes.length - 2; index++) {
          if (
            footLengthCm > sizes[index].cm &&
            footLengthCm <= sizes[index + 1].cm &&
            sex == sizes[index + 1].Sex
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

export default SizeChartShoes;
