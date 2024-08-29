import { Request, Response, NextFunction } from 'express';
import measureService from './../services/measure-services';

interface UploadRequestBody {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}

export async function measurePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    next(err);
  }
}
