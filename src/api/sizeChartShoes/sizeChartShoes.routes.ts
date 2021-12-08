import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getShoesSizeSchema, getShoesSizeSchemaAR } from './sizeChartShoes.dto';
import {
  getShoesSizeController,
  getShoesSizeAdidasController,
  getShoesSizeReebokController
} from './sizeChartShoes.controller';

export const getShoesSize: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size',
  schema: getShoesSizeSchema,
  handler: <RouteHandlerMethod>getShoesSizeController
};

export const getShoesSizeAdidas: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/adidas',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getShoesSizeAdidasController
};

export const getShoesSizeReebok: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/reebok',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getShoesSizeReebokController
};
