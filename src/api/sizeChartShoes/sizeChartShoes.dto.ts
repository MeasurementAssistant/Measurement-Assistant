import { FastifySchema } from 'fastify';

export const getShoesSizeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] }
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
            in: { type: 'number' }
          }
        }
      }
    }
  }
};

export const getShoesSizeSchemaAdidas: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      footLength: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] }
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
            EU: { type: 'string' },
            UK: { type: 'number' },
            USA: { type: 'number' },
            Sex: { type: 'string' },
            cm: { type: 'number' }
          }
        }
      }
    }
  }
};
