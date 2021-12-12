import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { userSchema } from './user.dto';
import { userController } from './user.controller';

export const createUser: RouteOptions = {
  method: 'POST',
  url: '/api/user',
  schema: userSchema,
  handler: <RouteHandlerMethod>userController
};
