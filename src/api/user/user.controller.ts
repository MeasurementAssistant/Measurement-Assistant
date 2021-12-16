/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import UserService from './user.service';

const service = new UserService();

export const userController = async (
  request: FastifyRequest<{
    Body: { googleId: string; email: string };
    Headers: { authorization: string };
  }>,
  reply: FastifyReply
) => {
  const { googleId, email } = request.body;
  const { authorization } = request.headers;
  try {
    const userData = await service.checkAndCreateUser(email, googleId, authorization);
    reply.code(200).send({ userData: userData });
  } catch (error: any) {
    reply.code(error.statusCode).send({ error: <HttpError>error.message });
  }
};

export const updateAccessKeyController = async (
  request: FastifyRequest<{
    Body: { googleId: string; email: string };
    Headers: { authorization: string };
  }>,
  reply: FastifyReply
) => {
  const { googleId, email } = request.body;
  const { authorization } = request.headers;
  try {
    const userData = await service.updateAccessKey(email, googleId, authorization);
    reply.code(200).send({ userData: userData });
  } catch (error: any) {
    reply.code(error.statusCode).send({ error: <HttpError>error.message });
  }
};
