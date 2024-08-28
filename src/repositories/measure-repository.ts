import { Measure } from '../types/measure-type';
import { prisma } from './../config';

async function getAll() {
  return prisma.measure.findMany();
}

async function createMeasure(data: Measure) {
  return prisma.measure.create({
    data,
  });
}

export default {
  getAll,
  createMeasure,
};
