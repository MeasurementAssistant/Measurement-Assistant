import { FastifySchema } from 'fastify';

export const getShoesSizeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] },
      unit: { type: 'string', enum: ['cm', 'inch'] }
    },
    required: ['footLength', 'sex']
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
            Sex: { type: 'string' },
            cm: { type: 'number' },
            inch: { type: 'number' }
          }
        }
      }
    }
  }
};

export const getShoesSizeSchemaAR: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] },
      unit: { type: 'string', enum: ['cm', 'inch'] }
    },
    required: ['footLength', 'sex']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        shoesSize: {
          type: 'object',
          properties: {
            RU: { type: 'number' },
            EU: { type: ['string', 'number'] },
            UK: { type: 'number' },
            USA: { type: 'number' },
            Sex: { type: 'string' },
            cm: { type: 'number' },
            inch: { type: 'number' }
          }
        }
      }
    }
  }
};
