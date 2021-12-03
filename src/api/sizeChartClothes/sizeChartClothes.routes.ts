import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getClothesSizeSchema, getShoesSizeSchemaAR } from './sizeChartClothes.dto';
import {
  getClothesSizeCmController,
  getClothesSizeInController,
  getClothesReebok
} from './sizeChartClothes.controller';

export const getClothesSizeCm: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/cm',
  schema: getClothesSizeSchema,
  handler: <RouteHandlerMethod>getClothesSizeCmController
};

export const getClothesSizeIn: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/in',
  schema: getClothesSizeSchema,
  handler: <RouteHandlerMethod>getClothesSizeInController
};

export const getClothesSizeReebok: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/cm/reebok',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getClothesReebok
};
