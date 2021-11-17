import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getShoesSizeSchema } from './sizeChartShoes.dto';
// import { getShoesSizeSchemaAdidas } from './sizeChartShoes.dto';
import { getShoesSizeCmController, getShoesSizeInController } from './sizeChartShoes.controller';

export const getShoesSizeCm: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size-cm',
  schema: getShoesSizeSchema,
  handler: <RouteHandlerMethod>getShoesSizeCmController
};

export const getShoesSizeIn: RouteOptions = {
  method: 'GET',
  url: '/api/shoes-size-in',
  schema: getShoesSizeSchema,
  handler: <RouteHandlerMethod>getShoesSizeInController
};

// export const getShoesSizeAdidas: RouteOptions = {
//   method: 'GET',
//   url: '/api/shoes-size-adidas',
//   schema: getShoesSizeSchemaAdidas,
//   handler: <RouteHandlerMethod>getShoesSizeInController
// };
