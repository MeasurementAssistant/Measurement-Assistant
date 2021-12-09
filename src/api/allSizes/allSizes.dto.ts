import { FastifySchema } from 'fastify';

export const getAllSizesSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      bustSize: { type: 'number' },
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] }
    },
    required: ['bustSize', 'waistSize', 'hipsSize', 'sex', 'footLength']
  },
  params: {
    type: 'object',
    properties: {
      fileType: { type: 'string', enum: ['excel', 'pdf'] }
    },
    required: ['fileType']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        bodyTypeResult: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }
};
