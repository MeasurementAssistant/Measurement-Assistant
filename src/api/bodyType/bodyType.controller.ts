/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import BodyType from './bodyType.service';

const service = new BodyType();

export const getBodyTypeResult = (
  request: FastifyRequest<{
    Querystring: { bustSize: number; waistSize: number; hipsSize: number; sex: string };
    Params: { unit: string };
  }>,
  reply: FastifyReply
) => {
  const { bustSize, waistSize, hipsSize, sex } = request.query;
  const { unit } = request.params;
  try {
    const result = service.getBodyTypeforMeasurements(bustSize, waistSize, hipsSize, sex, unit);
    reply.code(200).send({ bodyTypeResult: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
