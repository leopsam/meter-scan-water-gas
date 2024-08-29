import { Measure } from '../types/measure-type';
import { prisma } from './../config';

async function createMeasure(data: Measure) {
  return prisma.measure.create({
    data,
  });
}

async function findMeasureByData(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return await prisma.measure.findFirst({
    where: {
      measure_datetime: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });
}

export default {
  createMeasure,
  findMeasureByData,
};
