import { FastifySchema } from 'fastify';

export const getShoesSizeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      footLength: { type: 'number' }
    },
    required: ['footLength']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        shoesSizes: {
          type: 'object',
          properties: {
            UK: { type: 'number' },
            USA: { type: 'number' },
            EU: { type: 'number' },
            SexID: { type: 'number' },
            cm: { type: 'number' },
            in: { type: 'number' }
          }
        }
      }
    }
  }
};
