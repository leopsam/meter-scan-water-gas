import { Measure } from '../types/measure-type';
import { prisma } from './../config';

async function createMeasure(data: Measure) {
  return prisma.measure.create({
    data,
  });
}

async function getAllMeasures() {
  return await prisma.measure.findMany();
}

async function getMeasureByUuid(uuid: string) {
  return prisma.measure.findFirst({
    where: {
      measure_uuid: uuid,
    },
  });
}

async function updateMeasureValue(id: number, value: number) {
  return prisma.measure.update({
    where: { id },
    data: {
      measure_value: value,
      has_confirmed: true,
    },
  });
}

async function getMeasuresByCustomer(code: string) {
  return prisma.measure.findMany({
    where: { customer_code: code },
  });
}

async function getMeasuresByCustomerAndType(code: string, type: string) {
  return prisma.measure.findMany({
    where: { customer_code: code, measure_type: type },
  });
}

export default {
  createMeasure,
  getMeasureByUuid,
  updateMeasureValue,
  getMeasuresByCustomer,
  getMeasuresByCustomerAndType,
  getAllMeasures,
};
