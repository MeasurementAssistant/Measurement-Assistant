import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getClothesSizeSchema, getShoesSizeSchemaAR } from './sizeChartClothes.dto';
import {
  getClothesSizeCmController,
  getClothesSizeInController,
  getClothesSizeAdidasController
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

export const getClothesSizeAdidas: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/cm/adidas',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getClothesSizeAdidasController
};
