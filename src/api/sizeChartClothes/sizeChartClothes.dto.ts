import { FastifySchema } from 'fastify';

export const getClothesSizeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      bustSize: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] },
      lang: {
        type: 'string',
        enum: ['en', 'de', 'es', 'fr', 'it', 'pl', 'pt', 'ru', 'uk']
      }
    },
    required: ['waistSize', 'hipsSize', 'bustSize', 'sex']
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
        clothesSizes: {
          type: 'object',
          properties: {
            EU: { type: 'number' },
            UK: { type: 'number' },
            USA: { type: 'number' },
            Sex: { type: 'string' },
            International: { type: 'number' },
            BustCm: { type: 'number' },
            BustInch: { type: 'number' },
            WaistCm: { type: 'number' },
            WaistInch: { type: 'number' },
            HipsCm: { type: 'number' },
            HipsInch: { type: 'number' }
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
      waistSize: { type: 'number' },
      hipsSize: { type: 'number' },
      bustSize: { type: 'number' },
      sex: { type: 'string', enum: ['female', 'male'] }
    },
    required: ['waistSize', 'hipsSize', 'bustSize', 'sex']
  },
  params: {
    type: 'object',
    properties: {
      unit: { type: 'string', enum: ['cm', 'inch'] },
      brand: { type: 'string', enum: ['reebok', 'adidas'] }
    },
    required: ['unit', 'brand']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        clothesSizes: {
          type: 'object',
          properties: {
            RU: { type: ['string', 'number'] },
            EU: { type: ['string', 'number'] },
            BustCm: { type: 'number' },
            BustInch: { type: 'number' },
            WaistCm: { type: 'number' },
            WaistInch: { type: 'number' },
            HipsCm: { type: 'number' },
            HipsInch: { type: 'number' },
            Sex: { type: 'string' }
          }
        }
      }
    }
  }
};
