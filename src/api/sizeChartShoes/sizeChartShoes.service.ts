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
  async getSizeChartARShoes(
    footLength: number,
    sex: string,
    unit: string,
    brand: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      const now = new Date();
      await this.dbDriver.connect();
      const expiredDate: QueryResult = await this.dbDriver.executeQuery(getExpiredDate(brand));
      if (now > expiredDate.rows[0] || !expiredDate.rows[0]) {
        await this.dbDriver.executeQuery(deleteDataFromTableAR(brand));
        const insertValues =
          brand == 'reebok' ? await getReebokSizeChart('shoes') : await getAdidasSizeChartShoes();
        await this.dbDriver.executeQuery(insertARShoes(insertValues, brand));
      }
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeShoesAR(footLength, sex, unit, brand)
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
