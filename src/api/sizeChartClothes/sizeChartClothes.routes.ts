import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getClothesSizeSchema, getShoesSizeSchemaAR } from './sizeChartClothes.dto';
import { getClothesSizeController, getClothesBrandController } from './sizeChartClothes.controller';

export const getClothesSize: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/:unit',
  schema: getClothesSizeSchema,
  handler: <RouteHandlerMethod>getClothesSizeController
};

export const getClothesSizeBrand: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size/:unit/:brand',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getClothesBrandController
};
