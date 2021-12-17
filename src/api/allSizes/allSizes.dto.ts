import { FastifySchema } from 'fastify';

export const getAllSizesSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      Authorization: { type: 'string' }
    },
    required: ['Authorization']
  },
  querystring: {
    type: 'object',
    properties: {
      bustSize: { type: 'number' },
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] },
      lang: {
        type: 'string',
        enum: ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'uk']
      }
    },
    required: ['bustSize', 'waistSize', 'hipsSize', 'footLength', 'sex']
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
