/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpError from '../../errors/httpErrors';
import AllSizes from './allSizes.service';

const service = new AllSizes();

export const getAllSizesResult = async (
  request: FastifyRequest<{
    Querystring: {
      bustSize: number;
      waistSize: number;
      hipsSize: number;
      footLength: number;
      sex: string;
    };
    Params: { fileType: string; unit: string };
  }>,
  reply: FastifyReply
) => {
  const { bustSize, waistSize, hipsSize, footLength, sex } = request.query;
  const { fileType, unit } = request.params;
  try {
    const result =
      fileType == 'pdf'
        ? service.generatePDF()
        : await service.generateXLSXfile(bustSize, waistSize, hipsSize, footLength, sex, unit);
    reply.headers({
      'Content-Disposition': 'attachment; filename="AllSizes.xlsx"',
      'Content-Type': 'application/xlsx'
    });
    reply.code(200).send(result);
  } catch (error: any) {
    reply.code(500).send({ error: <HttpError>error.message });
  }
};
