import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { getAllSizesSchema } from './allSizes.dto';
import { getAllSizesResult } from './allSizes.controller';

export const getAllSizes: RouteOptions = {
  method: 'GET',
  url: '/api/all-sizes/:unit/:fileType',
  schema: getAllSizesSchema,
  handler: <RouteHandlerMethod>getAllSizesResult
};
