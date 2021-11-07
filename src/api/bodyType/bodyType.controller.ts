/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import BodyType from './bodyType.service';

const service = new BodyType();

export const getBodyTypeResultCm = (
  request: FastifyRequest<{
    Querystring: { bustSize: number; waistSize: number; hipsSize: number; sex: string };
  }>,
  reply: FastifyReply
) => {
  const { bustSize, waistSize, hipsSize, sex } = request.query;
  try {
    const result = service.getBodyTypeforMeasurementsCm(bustSize, waistSize, hipsSize, sex);
    reply.code(200).send({ bodyTypeResult: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getBodyTypeResultIn = (
  request: FastifyRequest<{
    Querystring: { bustSize: number; waistSize: number; hipsSize: number; sex: string };
  }>,
  reply: FastifyReply
) => {
  const { bustSize, waistSize, hipsSize, sex } = request.query;
  try {
    const result = service.getBodyTypeforMeasurementsIn(bustSize, waistSize, hipsSize, sex);
    reply.code(200).send({ bodyTypeResult: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
