/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import SizeChartClothes from './sizeChartClothes.service';

const service = new SizeChartClothes();

export const getClothesSizeCmController = (
  request: FastifyRequest<{
    Querystring: { waist: number; hips: number; bust: number; sex: string };
  }>,
  reply: FastifyReply
) => {
  const { waist, hips, bust, sex } = request.query; //
  try {
    const result = service.getSizeChartClothesforCm(waist, hips, bust, sex);
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getClothesSizeInController = (
  request: FastifyRequest<{
    Querystring: { waist: number; hips: number; bust: number; sex: string };
  }>,
  reply: FastifyReply
) => {
  const { waist, hips, bust, sex } = request.query;
  try {
    const result = service.getSizeChartClothesforIn(waist, hips, bust, sex);
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getClothesSizeAdidasController = async (
  request: FastifyRequest<{
    Querystring: { waistSize: number; hipsSize: number; bustSize: number; sex: string };
  }>,
  reply: FastifyReply
) => {
  const { waistSize, hipsSize, bustSize, sex } = request.query;
  try {
    const result =
      sex == 'female'
        ? await service.getSizeChartAdidasClothesFemale(waistSize, hipsSize, bustSize)
        : await service.getSizeChartAdidasClothesMale(waistSize, hipsSize, bustSize);
    console.log(result);
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
