import measureRepositories from './../repositories/measure-repository';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import errors from '../errors/index';
import { Measure } from '../types/measure-type';

const API_KEY = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function createMeasure(
  image: string,
  customer_code: string,
  measure_datetime: Date,
  measure_type: string
) {
  const mimeType = 'image/jpeg';

  function base64ToGenerativePart(base64Image: string, mimeType: string) {
    return {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    };
  }

  const imagePart = base64ToGenerativePart(image, mimeType);
  const prompt = 'What number is present in this image?';
  const result = await model.generateContent([prompt, imagePart]);

  function extractTextNumber(text: string): string {
    const match = text.match(/\d+/);
    return match ? match[0] : '';
  }

  const numberResult = extractTextNumber(result.response.text());

  const dataUrl = `data:image/png;base64,${image}`;

  const has_confirmed = false;

  const measureData = {
    image_url: dataUrl,
    customer_code,
    measure_datetime,
    measure_type,
    has_confirmed,
    measure_value: Number(numberResult),
    measure_uuid: uuidv4(),
  };

  if (typeof measure_datetime === 'string')
    measure_datetime = new Date(measure_datetime);

  const dataMeasure =
    await measureRepositories.findMeasureByData(measure_datetime);

  if (dataMeasure?.measure_datetime.getMonth() === measure_datetime.getMonth())
    throw errors.doubleReport('Leitura do mês já realizada');

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

export async function patchMeasure(
  measure_uuid: string,
  confirmed_value: number
) {
  const measure = await measureRepositories.getMeasureByUuid(measure_uuid);
  if (!measure) throw errors.NotFound('Leitura do mês já realizada');

  if (confirmed_value == measure.measure_value)
    throw errors.confirmationDuplicate('Leitura do mês já realizada');

  const measureConfirmed = await measureRepositories.updateMeasureValue(
    measure.id,
    Number(confirmed_value)
  );

  const reult = { success: measureConfirmed.has_confirmed };

  return reult;
}

export async function getCustomer(customer_code: string, measure_type: any) {
  let measures;

  if (!measure_type) {
    measures = await measureRepositories.getMeasuresByCustomer(customer_code);
  } else if (!['water', 'gas'].includes(measure_type.toLowerCase())) {
    throw errors.invalidType('Tipo de medição não permitida');
  } else {
    measures = await measureRepositories.getMeasuresByCustomerAndType(
      customer_code,
      measure_type.toUpperCase()
    );
  }

  if (!measures || measures.length === 0) {
    throw errors.NotFound('Nenhuma leitura encontrada');
  }

  const measuresResult = {
    customer_code,
    measures: measures.map((measure) => ({
      measure_uuid: measure.measure_uuid,
      measure_datetime: measure.measure_datetime,
      measure_type: measure.measure_type,
      has_confirmed: measure.has_confirmed,
      image_url: measure.image_url,
    })),
  };

  return measuresResult;
}

export default {
  createMeasure,
  patchMeasure,
  getCustomer,
};
