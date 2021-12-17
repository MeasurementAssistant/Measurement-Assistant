import { FastifySchema } from 'fastify';

export const userSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      Authorization: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      googleId: { type: 'string' },
      email: { type: 'string' }
    },
    required: ['googleId', 'email']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        userData: {
          type: 'object',
          properties: {
            accessKey: { type: 'string' },
            username: { type: 'string' }
          }
        }
      }
    }
  }
};
