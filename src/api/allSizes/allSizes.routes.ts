import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getAllSizesSchema } from './allSizes.dto';
import { getAllSizesResult } from './allSizes.controller';

export const getBodyType: RouteOptions = {
  method: 'GET',
  url: '/api/all-sizes/:fileType',
  schema: getAllSizesSchema,
  handler: <RouteHandlerMethod>getAllSizesResult
};
