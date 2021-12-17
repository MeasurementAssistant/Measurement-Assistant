import { QueryResult } from 'pg';
import HttpError from '../../errors/httpErrors';
import { getAdidasSizeChart, getReebokSizeChart } from '../../services/parser';
import PostgresDriver from '../../db/pg';
import {
  getSizeClothes,
  getClothesExpiredDate,
  deleteDataFromClothesTableAR,
  insertARClothes,
  getSizeClothesAR
} from '../../db/pg/db_queries';
import { configureI18n } from '../../i18n.config';

const [i18nObj] = configureI18n(false);

// i18nObj.setLocale('en');
class SizeChartClothes {
  private sizeNF: { [key: string]: number | string } = {
    EU: 0,
    UK: 0,
    USA: 0,
    Sex: i18nObj.__('notFound'),
    International: 0,
    BustCm: 0,
    BustInch: 0,
    WaistCm: 0,
    WaistInch: 0,
    HipsCm: 0,
    HipsInch: 0
  };
  private sizeARNF: { [key: string]: number | string } = {
    RU: 0,
    EU: 0,
    BustCm: 0,
    BustInch: 0,
    WaistCm: 0,
    WaistInch: 0,
    HipsCm: 0,
    HipsInch: 0,
    Sex: i18nObj.__('notFound')
  };
  private dbDriver = new PostgresDriver();

  async getSizeChartClothes(
    waistSize: number,
    hipsSize: number,
    bustSize: number,
    sex: string,
    unit: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      await this.dbDriver.connect();
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeClothes(bustSize, waistSize, hipsSize, sex, unit)
      );
      await this.dbDriver.disconnect();
      if (sizeResult && sizeResult.rows[0]) {
        return { ...sizeResult.rows[0], Sex: i18nObj.__(`sex.${sex}`) };
      }
      return this.sizeNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  async getSizeChartARClothes(
    waistSize: number,
    hipsSize: number,
    bustSize: number,
    sex: string,
    unit: string,
    brand: string
  ): Promise<{ [key: string]: number | string }> {
    try {
      const now = new Date();
      await this.dbDriver.connect();
      const expiredDate: QueryResult = await this.dbDriver.executeQuery(
        getClothesExpiredDate(brand)
      );
      if (now > expiredDate.rows[0] || !expiredDate.rows[0]) {
        await this.dbDriver.executeQuery(deleteDataFromClothesTableAR(brand));
        const insertValues =
          brand == 'reebok'
            ? await getReebokSizeChart('clothes')
            : await getAdidasSizeChart('clothes');
        await this.dbDriver.executeQuery(insertARClothes(insertValues, brand));
      }
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeClothesAR(bustSize, waistSize, hipsSize, sex, unit, brand)
      );
      await this.dbDriver.disconnect();
      if (sizeResult && sizeResult.rows[0]) {
        return { ...sizeResult.rows[0], Sex: i18nObj.__(`sex.${sex}`) };
      }
      return this.sizeARNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}
export default SizeChartClothes;
