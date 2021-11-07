import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getBodyTypeSchema } from './bodyType.dto';
import { getBodyTypeResultCm, getBodyTypeResultIn } from './bodyType.controller';

export const getBodyTypeCm: RouteOptions = {
  method: 'GET',
  url: '/api/body-type-cm',
  schema: getBodyTypeSchema,
  handler: <RouteHandlerMethod>getBodyTypeResultCm
};

export const getBodyTypeIn: RouteOptions = {
  method: 'GET',
  url: '/api/body-type-in',
  schema: getBodyTypeSchema,
  handler: <RouteHandlerMethod>getBodyTypeResultIn
};
