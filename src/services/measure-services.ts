import measureRepositories from './../repositories/measure-repository';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import errors from '../errors/index';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function createMeasure(
  image: string,
  customer_code: string,
  measure_datetime: Date,
  measure_type: string
) {
  if (typeof measure_datetime === 'string')
    measure_datetime = new Date(measure_datetime);

  const dataAllMeasure = await measureRepositories.getAllMeasures();

  const dateBody = new Date(measure_datetime);
  const monthBody = dateBody.getMonth() + 1;

  for (const measure of dataAllMeasure) {
    if (
      measure.measure_type === measure_type &&
      measure.customer_code === customer_code &&
      measure.measure_datetime.getMonth() + 1 === monthBody
    ) {
      throw errors.doubleReport('Leitura do mês já realizada');
    }
  }

  function base64ToGenerativePart(base64Image: string, mimeType: string) {
    return {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    };
  }

  const imagePart = base64ToGenerativePart(image, 'image/jpeg');

  const prompt = 'What number is present in this image?';
  const result = await model.generateContent([prompt, imagePart]);

  function extractTextNumber(text: string): string {
    const match = text.match(/\d+/);
    return match ? match[0] : '';
  }

  const numberResult = extractTextNumber(result.response.text());

  const outputPath = path.join(__dirname, './../output', 'imagem.jpg');

  async function saveBase64Image(base64String: string, outputPath: string) {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outputPath, buffer);
  }

  await saveBase64Image(image, outputPath);

  const fileManager = new GoogleAIFileManager(API_KEY);

  const uploadResponse = await fileManager.uploadFile(
    './src/output/imagem.jpg',
    {
      mimeType: 'image/jpeg',
      displayName: 'Jetpack drawing',
    }
  );

  const url = uploadResponse.file.uri;

  async function deleteFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Erro ao excluir o arquivo ${filePath}:`, err);
    });
  }

  await deleteFile(outputPath);

  const measureData = {
    image_url: url,
    customer_code,
    measure_datetime,
    measure_type,
    has_confirmed: false,
    measure_value: Number(numberResult),
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

export async function patchMeasure(
  measure_uuid: string,
  confirmed_value: number
) {
  const measure = await measureRepositories.getMeasureByUuid(measure_uuid);
  if (!measure) throw errors.NotFound('Leitura não encontrada');

  if (measure.has_confirmed === true)
    throw errors.confirmationDuplicate('Leitura do mês já realizada');

  await measureRepositories.updateMeasureValue(
    measure.id,
    Number(confirmed_value)
  );

  return { success: true };
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
