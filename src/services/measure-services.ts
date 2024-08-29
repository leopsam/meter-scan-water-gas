import measureRepositories from './../repositories/measure-repository';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import errors from '../errors/index';

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

  const measureData = {
    image_url: dataUrl,
    customer_code,
    measure_datetime,
    measure_type,
    measure_value: Number(numberResult),
    measure_uuid: uuidv4(),
  };

  if (typeof measure_datetime === 'string')
    measure_datetime = new Date(measure_datetime);

  const dataMeasure =
    await measureRepositories.findMeasureByData(measure_datetime);

  if (dataMeasure?.measure_datetime.getMonth() === measure_datetime.getMonth())
    throw errors.doubleReport();

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
  createMeasure,
};
