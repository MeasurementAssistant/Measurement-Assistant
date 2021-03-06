import { FastifySchema } from 'fastify';

export const getAllSizesSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      accessKey: { type: 'string' },
      bustSize: { type: 'number' },
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] },
      lang: {
        type: 'string',
        enum: ['en', 'de', 'es', 'fr', 'it', 'pl', 'pt', 'ru', 'uk']
      }
    },
    required: ['bustSize', 'waistSize', 'hipsSize', 'footLength', 'sex', 'accessKey']
  },
  params: {
    type: 'object',
    properties: {
      unit: { type: 'string', enum: ['cm', 'inch'] },
      fileType: { type: 'string', enum: ['xlsx', 'pdf'] }
    },
    required: ['unit', 'fileType']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        result: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }
};
