import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getClothesSizeSchema, getShoesSizeSchemaAR } from './sizeChartClothes.dto';
import {
  getClothesSizeController,
  getClothesSizeAdidasController,
  getClothesReebok
} from './sizeChartClothes.controller';

export const getClothesSize: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/:unit',
  schema: getClothesSizeSchema,
  handler: <RouteHandlerMethod>getClothesSizeController
};

export const getClothesSizeAdidas: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/cm/adidas',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getClothesSizeAdidasController
};

export const getClothesSizeReebok: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/cm/reebok',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getClothesReebok
};
