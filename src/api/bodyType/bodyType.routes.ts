import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getBodyTypeSchema } from './bodyType.dto';
import { getBodyTypeResult } from './bodyType.controller';

export const getBodyType: RouteOptions = {
  method: 'GET',
  url: '/api/body-type/:unit',
  schema: getBodyTypeSchema,
  handler: <RouteHandlerMethod>getBodyTypeResult
};
