import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getShoesSizeSchema, getShoesSizeSchemaAR } from './sizeChartShoes.dto';
import {
  getShoesSizeCmController,
  getShoesSizeInController,
  getShoesSizeAdidasController,
  getShoesSizeReebokController
} from './sizeChartShoes.controller';

export const getShoesSizeCm: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/cm',
  schema: getShoesSizeSchema,
  handler: <RouteHandlerMethod>getShoesSizeCmController
};

export const getShoesSizeIn: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/in',
  schema: getShoesSizeSchema,
  handler: <RouteHandlerMethod>getShoesSizeInController
};

export const getShoesSizeAdidas: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/cm/adidas',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getShoesSizeAdidasController
};

export const getShoesSizeReebok: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size/cm/reebok',
  schema: getShoesSizeSchemaAR,
  handler: <RouteHandlerMethod>getShoesSizeReebokController
};
