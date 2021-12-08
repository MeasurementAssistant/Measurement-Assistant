import HttpError from '../../errors/httpErrors';
import PostgresDriver from '../../db/pg';
import {
  getSizeShoes,
  getExpiredDate,
  getSizeShoesAR,
  insertARShoes,
  deleteDataFromTableAR
} from '../../db/pg/db_queries';
import { getAdidasSizeChartShoes, getReebokSizeChart } from '../../services/parser';
import { QueryResult } from 'pg';

class SizeChartShoes {
  private sizeNF: { [key: string]: number | string } = {
    UK: 0,
    USA: 0,
    EU: 0,
    Sex: 'not found',
    cm: 0,
    inch: 0
  };
  private sizeARNF: { [key: string]: number | string } = {
    RU: 0,
    EU: 0,
    UK: 0,
    USA: 0,
    Sex: 'not found',
    cm: 0
  };
  private dbDriver = new PostgresDriver();

  async getSizeChart(
    footLength: number,
    sex: string,
    unit: string
  ): Promise<{ [key: string]: number | string } | QueryResult> {
    try {
      await this.dbDriver.connect();
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeShoes(footLength, sex, unit)
      );
      await this.dbDriver.disconnect();
      console.log(sizeResult.rows[0]);
      if (sizeResult) {
        return sizeResult.rows[0];
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
      sizes.unshift({ RU: 0, EU: 0, UK: 0, USmale: 0, USfemale: 0, cm: 0 });
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
    footLength: number,
    sex: string,
    unit: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      const now = new Date();
      await this.dbDriver.connect();
      const expiredDate: QueryResult = await this.dbDriver.executeQuery(getExpiredDate('reebok'));
      if (now > expiredDate.rows[0] || !expiredDate.rows[0]) {
        await this.dbDriver.executeQuery(deleteDataFromTableAR('reebok'));
        const insertValues = await getReebokSizeChart('shoes');
        await this.dbDriver.executeQuery(insertARShoes(insertValues, 'reebok'));
      }
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeShoesAR(footLength, sex, unit, 'reebok')
      );
      await this.dbDriver.disconnect();
      if (sizeResult) {
        return sizeResult.rows[0];
      }
      return this.sizeARNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartShoes;
