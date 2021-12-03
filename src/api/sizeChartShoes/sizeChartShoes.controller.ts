/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import SizeChartShoes from './sizeChartShoes.service';

const service = new SizeChartShoes();

export const getShoesSizeCmController = (
  request: FastifyRequest<{
    Querystring: { footLength: number };
  }>,
  reply: FastifyReply
) => {
  const { footLength } = request.query;
  try {
    const result = service.getSizeChartforCmFootLength(footLength);
    reply.code(200).send({ shoesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getShoesSizeInController = (
  request: FastifyRequest<{
    Querystring: { footLength: number };
  }>,
  reply: FastifyReply
) => {
  const { footLength } = request.query;
  try {
    const result = service.getSizeChartforInFootLength(footLength);
    reply.code(200).send({ shoesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getShoesSizeAdidasController = async (
  request: FastifyRequest<{
    Querystring: { footLength: number; sex: string };
  }>,
  reply: FastifyReply
) => {
  const { footLength, sex } = request.query;
  try {
    const result = await service.getSizeChartAdidasShoes(footLength, sex);
    reply.code(200).send({ shoesSize: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
