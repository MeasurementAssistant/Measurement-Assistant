import { FastifySchema } from 'fastify';

export const getBodyTypeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      bustSize: { type: 'number' },
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] },
      lang: {
        type: 'string',
        enum: ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'uk']
      }
    },
    required: ['bustSize', 'waistSize', 'hipsSize', 'sex']
  },
  params: {
    type: 'object',
    properties: {
      unit: { type: 'string', enum: ['cm', 'inch'] }
    },
    required: ['unit']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        bodyTypeResult: {
          type: 'object',
          properties: {
            bodyType: { type: 'string' },
            description: { type: 'string' }
          }
        }
      }
    }
  }
};
