/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import SizeChartShoes from './sizeChartShoes.service';

const service = new SizeChartShoes();

export const getShoesSizeController = async (
  request: FastifyRequest<{
    Querystring: { footLength: number; sex: string; lang: string };
    Params: { unit: string };
  }>,
  reply: FastifyReply
) => {
  const { footLength, sex, lang } = request.query;
  const { unit } = request.params;
  try {
    const result = await service.getSizeChart(footLength, sex, unit, lang);
    reply.code(200).send({ shoesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getShoesSizeBrandController = async (
  request: FastifyRequest<{
    Querystring: { footLength: number; sex: string; lang: string };
    Params: { unit: string; brand: string };
  }>,
  reply: FastifyReply
) => {
  const { footLength, sex, lang } = request.query;
  const { unit, brand } = request.params;
  try {
    const result = await service.getSizeChartARShoes(footLength, sex, unit, brand, lang);
    reply.code(200).send({ shoesSize: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
