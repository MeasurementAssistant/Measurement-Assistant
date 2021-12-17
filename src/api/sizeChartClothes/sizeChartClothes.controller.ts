/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import SizeChartClothes from './sizeChartClothes.service';

const service = new SizeChartClothes();

export const getClothesSizeController = async (
  request: FastifyRequest<{
    Querystring: {
      waistSize: number;
      hipsSize: number;
      bustSize: number;
      sex: string;
      lang: string;
    };
    Params: { unit: string };
  }>,
  reply: FastifyReply
) => {
  const { waistSize, hipsSize, bustSize, sex, lang } = request.query;
  const { unit } = request.params;
  try {
    const result = await service.getSizeChartClothes(
      waistSize,
      hipsSize,
      bustSize,
      sex,
      unit,
      lang
    );
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};

export const getClothesBrandController = async (
  request: FastifyRequest<{
    Querystring: {
      waistSize: number;
      hipsSize: number;
      bustSize: number;
      sex: string;
      lang: string;
    };
    Params: { unit: string; brand: string };
  }>,
  reply: FastifyReply
) => {
  const { waistSize, hipsSize, bustSize, sex, lang } = request.query;
  const { unit, brand } = request.params;
  try {
    const result = await service.getSizeChartARClothes(
      waistSize,
      hipsSize,
      bustSize,
      sex,
      unit,
      brand,
      lang
    );
    reply.code(200).send({ clothesSizes: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
