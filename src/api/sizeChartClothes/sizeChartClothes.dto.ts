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
  response: {
    200: {
      type: 'object',
      properties: {
        clothesSizes: {
          type: 'object',
          properties: {
            RU: { type: ['string', 'number'] },
            EU: { type: ['string', 'number'] },
            BustCm: {
              anyOf: [
                { type: 'number' },
                {
                  type: 'object',
                  properties: {
                    from: { type: 'number' },
                    to: { type: 'number' }
                  }
                }
              ]
            },
            WaistCm: {
              anyOf: [
                { type: 'number' },
                {
                  type: 'object',
                  properties: {
                    from: { type: 'number' },
                    to: { type: 'number' }
                  }
                }
              ]
            },
            HipsCm: {
              anyOf: [
                { type: 'number' },
                {
                  type: 'object',
                  properties: {
                    from: { type: 'number' },
                    to: { type: 'number' }
                  }
                }
              ]
            },
            Sex: { type: 'string' }
          }
        }
      }
    }
  }
};
