import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getShoesSizeSchema, getShoesSizeSchemaAR } from './sizeChartShoes.dto';
import { getShoesSizeController, getShoesSizeBrandController } from './sizeChartShoes.controller';

export const getShoesSize: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/:unit',
  schema: getShoesSizeSchema,
  handler: <RouteHandlerMethod>getShoesSizeController
};

export const getShoesBrandSize: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/:unit/:brand',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getShoesSizeBrandController
};
