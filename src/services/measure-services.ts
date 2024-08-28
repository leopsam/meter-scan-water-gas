import measureRepositories from './../repositories/measure-repository';
import { v4 as uuidv4 } from 'uuid';

async function getAllMeasure() {
  return await measureRepositories.getAll();
}

export async function createMeasure(
  image: string,
  customer_code: string,
  measure_datetime: Date,
  measure_type: string
) {
  const measureData = {
    image_url: image,
    customer_code,
    measure_datetime,
    measure_type,
    measure_value: 0,
    measure_uuid: uuidv4(),
  };

  const createMeasure = await measureRepositories.createMeasure({
    ...measureData,
  });

  const ResponseMeasure = {
    image_url: createMeasure.image_url,
    measure_value: createMeasure.measure_value,
    measure_uuid: createMeasure.measure_uuid,
  };

  return ResponseMeasure;
}

export default {
  getAllMeasure,
  createMeasure,
};
