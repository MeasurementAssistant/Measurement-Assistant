/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import SizeChartClothes from './sizeChartClothes.service';
import { getAdidasSizeChart } from '../../services/parser';

const service = new SizeChartClothes();

export const getClothesSizeCmController = (
  request: FastifyRequest<{
    Querystring: { waist: number; hips: number; bust: number };
  }>,
  reply: FastifyReply
) => {
  const { waist, hips, bust } = request.query; //
  try {
    getAdidasSizeChart();
    const result = service.getSizeChartClothesforCm(waist, hips, bust);
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getClothesSizeInController = (
  request: FastifyRequest<{
    Querystring: { waist: number; hips: number; bust: number };
  }>,
  reply: FastifyReply
) => {
  const { waist, hips, bust } = request.query;
  try {
    const result = service.getSizeChartClothesforIn(waist, hips, bust);
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
