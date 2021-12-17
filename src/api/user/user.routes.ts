import { RouteHandlerMethod, RouteOptions } from 'fastify';
import { userSchema } from './user.dto';
import { userController, updateAccessKeyController } from './user.controller';

export const createUser: RouteOptions = {
  method: 'POST',
  url: '/api/user',
  schema: userSchema,
  handler: <RouteHandlerMethod>userController
};

export const updateAccessKey: RouteOptions = {
  method: 'PUT',
  url: '/api/user/accesskey',
  schema: userSchema,
  handler: <RouteHandlerMethod>updateAccessKeyController
};
