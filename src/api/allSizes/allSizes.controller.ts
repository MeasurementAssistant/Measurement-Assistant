/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import AllSizes from './allSizes.service';

const service = new AllSizes();

export const getAllSizesResult = (
  request: FastifyRequest<{
    Querystring: {
      bustSize: number;
      waistSize: number;
      hipsSize: number;
      footLength: string;
      sex: string;
    };
    Params: { fileType: string };
  }>,
  reply: FastifyReply
) => {
  const { bustSize, waistSize, hipsSize, footLength, sex } = request.query;
  const { fileType } = request.params;
  try {
    const result = fileType == 'pdf' ? service.generatePDF() : service.generateExcel();
    reply.code(200).send({ bodyTypeResult: result });
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
