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
      lang: {
        type: 'string',
        enum: ['en', 'de', 'es', 'fr', 'it', 'pl', 'pt', 'ru', 'uk']
      }
    },
    required: ['footLength', 'sex']
  },
  params: {
    type: 'object',
    properties: {
      unit: { type: 'string', enum: ['cm', 'inch'] },
      brand: { type: 'string', enum: ['adidas', 'reebok'] }
    },
    required: ['unit', 'brand']
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
