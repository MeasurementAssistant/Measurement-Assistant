/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryResult } from 'pg';
import HttpError from '../../errors/httpErrors';
import {
  getAdidasSizeChartClothesFemale,
  getAdidasSizeChartClothesMale,
  getReebokSizeChart
} from '../../services/parser';
import PostgresDriver from '../../db/pg';
import {
  getSizeClothes,
  getClothesExpiredDate,
  deleteDataFromClothesTableAR,
  insertReebokClothes,
  getSizeClothesReebok
} from '../../db/pg/db_queries';

class SizeChartClothes {
  private sizeNF: { [key: string]: number | string } = {
    EU: 0,
    UK: 0,
    USA: 0,
    Sex: 'not found',
    International: 0,
    BustCm: 0,
    BustIn: 0,
    WaistCm: 0,
    WaistIn: 0,
    HipsCm: 0,
    HipsIn: 0
  };
  private sizeARNF: { [key: string]: number | string } = {
    RU: 0,
    EU: 0,
    BustCm: 0,
    WaistCm: 0,
    HipsCm: 0,
    Sex: 'not found'
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
        return sizeResult.rows[0];
      }
      return this.sizeNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  async getSizeChartReebokClothes(
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
        const insertValues = brand == 'reebok' ? await getReebokSizeChart('clothes') : '';
        await this.dbDriver.executeQuery(insertReebokClothes(insertValues));
      }
      const sizeResult: QueryResult = await this.dbDriver.executeQuery(
        getSizeClothesReebok(bustSize, waistSize, hipsSize, sex, unit)
      );
      await this.dbDriver.disconnect();
      if (sizeResult && sizeResult.rows[0]) {
        return sizeResult.rows[0];
      }
      return this.sizeARNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  async getSizeChartAdidasClothesFemale(
    waistSize: number,
    hipsSize: number,
    bustSize: number
  ): Promise<{ [key: string]: number | string | { [key: string]: number } }> {
    try {
      const sizes: Array<{ [key: string]: string | number }> =
        await getAdidasSizeChartClothesFemale();
      let sizeResult: { [key: string]: string | number } = {};
      sizes.unshift({ RU: 0, EU: 0, BustCm: 0, WaistCm: 0, HipsCm: 0, Sex: 'female' });
      if (sizes) {
        for (let index = 0; index <= sizes.length - 2; index++) {
          if (
            bustSize > sizes[index].BustCm &&
            bustSize <= sizes[index + 1].BustCm &&
            waistSize > sizes[index].WaistCm &&
            waistSize <= sizes[index + 1].WaistCm &&
            hipsSize > sizes[index].HipsCm &&
            hipsSize <= sizes[index + 1].HipsCm
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

  async getSizeChartAdidasClothesMale(
    waistSize: number,
    hipsSize: number,
    bustSize: number
  ): Promise<{ [key: string]: number | string | { [key: string]: number | string } }> {
    try {
      const sizes: Array<{ [key: string]: { [key: string]: number | string } }> =
        await getAdidasSizeChartClothesMale();
      let sizeResult: { [key: string]: { [key: string]: number | string } } = {};
      sizes.unshift({
        sizes: { RU: 0, EU: 0 },
        BustCm: { from: 0, to: 0 },
        WaistCm: { from: 0, to: 0 },
        HipsCm: { from: 0, to: 0 }
      });
      if (sizes) {
        for (let index = 0; index <= sizes.length - 1; index++) {
          if (
            bustSize >= sizes[index].BustCm.from &&
            bustSize <= sizes[index].BustCm.to &&
            waistSize >= sizes[index].WaistCm.from &&
            waistSize <= sizes[index].WaistCm.to &&
            hipsSize >= sizes[index].HipsCm.from &&
            hipsSize <= sizes[index].HipsCm.to
          ) {
            sizeResult = sizes[index];
          } else if (
            bustSize > sizes[index].BustCm.to &&
            bustSize <= sizes[index + 1].BustCm.from &&
            waistSize >= sizes[index].WaistCm.to &&
            waistSize <= sizes[index + 1].WaistCm.from &&
            hipsSize >= sizes[index].HipsCm.to &&
            hipsSize <= sizes[index + 1].HipsCm.from
          ) {
            sizeResult = sizes[index + 1];
          }
        }
      }
      if (sizeResult && Object.keys(sizeResult).length) {
        return {
          RU: sizeResult.sizes.RU,
          EU: sizeResult.sizes.EU,
          BustCm: {
            from: sizeResult.BustCm.from,
            to: sizeResult.BustCm.to
          },
          WaistCm: {
            from: sizeResult.WaistCm.from,
            to: sizeResult.WaistCm.to
          },
          HipsCm: {
            from: sizeResult.HipsCm.from,
            to: sizeResult.HipsCm.to
          },
          Sex: 'male'
        };
      }
      return this.sizeARNF;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }
}
export default SizeChartClothes;
