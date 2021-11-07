import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getClothesSizeSchema } from './sizeChartClothes.dto';
import {
  getClothesSizeCmController,
  getClothesSizeInController
} from './sizeChartClothes.controller';

export const getClothesSizeCm: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size-cm',
  schema: getClothesSizeSchema,
  handler: <RouteHandlerMethod>getClothesSizeCmController
};

export const getClothesSizeIn: RouteOptions = {
  method: 'GET',
  url: '/api/clothes-size-in',
  schema: getClothesSizeSchema,
  handler: <RouteHandlerMethod>getClothesSizeInController
};
