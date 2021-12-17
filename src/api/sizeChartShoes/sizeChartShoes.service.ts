import { QueryResult } from 'pg';
import HttpError from '../../errors/httpErrors';
import PostgresDriver from '../../db/pg';
import {
  getSizeShoes,
  getShoesExpiredDate,
  getSizeShoesAR,
  insertARShoes,
  deleteDataFromShoesTableAR
} from '../../db/pg/db_queries';
import { getAdidasSizeChart, getReebokSizeChart } from '../../services/parser';
import { configureI18n } from '../../i18n.config';

const [i18nObj] = configureI18n(false);

class SizeChartShoes {
  private sizeNF: { [key: string]: number | string } = {
    UK: 0,
    USA: 0,
    EU: 0,
    Sex: 'Not found',
    cm: 0,
    inch: 0
  };
  private sizeARNF: { [key: string]: number | string } = {
    RU: 0,
    EU: 0,
    UK: 0,
    USA: 0,
    Sex: 'Not found',
    cm: 0
  };
  private dbDriver = new PostgresDriver();

  async getSizeChart(
    footLength: number,
    sex: string,
    unit: string,
    lang?: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      if (lang) {
        i18nObj.setLocale(lang);
      }
      await this.dbDriver.connect();
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeShoes(footLength, sex, unit)
      );
      await this.dbDriver.disconnect();
      if (sizeResult && sizeResult.rows[0]) {
        return { ...sizeResult.rows[0], Sex: i18nObj.__(`sex.${sex}`) };
      }
      return { ...this.sizeNF, Sex: i18nObj.__('notFound') };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
  async getSizeChartARShoes(
    footLength: number,
    sex: string,
    unit: string,
    brand: string,
    lang?: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      if (lang) {
        i18nObj.setLocale(lang);
      }
      const now = new Date();
      await this.dbDriver.connect();
      const expiredDate: QueryResult = await this.dbDriver.executeQuery(getShoesExpiredDate(brand));
      if (now > expiredDate.rows[0] || !expiredDate.rows[0]) {
        await this.dbDriver.executeQuery(deleteDataFromShoesTableAR(brand));
        const insertValues =
          brand == 'reebok' ? await getReebokSizeChart('shoes') : await getAdidasSizeChart('shoes');
        await this.dbDriver.executeQuery(insertARShoes(insertValues, brand));
      }
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeShoesAR(footLength, sex, unit, brand)
      );
      await this.dbDriver.disconnect();
      if (sizeResult && sizeResult.rows[0]) {
        return { ...sizeResult.rows[0], Sex: i18nObj.__(`sex.${sex}`) };
      }
      return { ...this.sizeARNF, Sex: i18nObj.__('notFound') };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}

export default SizeChartShoes;
