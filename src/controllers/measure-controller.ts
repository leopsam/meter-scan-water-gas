import { Request, Response } from 'express';
import measureService from './../services/measure-services';

interface UploadRequestBody {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}

export async function getAllMeasure(req: Request, res: Response) {
  try {
    const AllMeasure = await measureService.getAllMeasure();
    return res.status(200).send(AllMeasure);
  } catch (err) {
    return res.status(404).send(err);
  }
}

export async function measurePost(req: Request, res: Response) {
  const { image, customer_code, measure_datetime, measure_type } =
    req.body as UploadRequestBody;

  try {
    const ResponseMeasure = await measureService.createMeasure(
      image,
      customer_code,
      measure_datetime,
      measure_type
    );
    return res.status(200).send(ResponseMeasure);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}
