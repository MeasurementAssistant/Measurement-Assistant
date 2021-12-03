import { FastifySchema } from 'fastify';

export const getClothesSizeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      bustSize: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] }
    },
    required: ['waistSize', 'hipsSize', 'bustSize', 'sex']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        clothesSizes: {
          type: 'object',
          properties: {
            EU: { type: 'number' },
            UK: { type: 'number' },
            USA: { type: 'number' },
            Sex: { type: 'string' },
            International: { type: 'number' },
            BustCm: { type: 'number' },
            BustIn: { type: 'number' },
            WaistCm: { type: 'number' },
            WaistIn: { type: 'number' },
            HipsCm: { type: 'number' },
            HipsIn: { type: 'number' }
          }
        }
      }
    }
  }
};
