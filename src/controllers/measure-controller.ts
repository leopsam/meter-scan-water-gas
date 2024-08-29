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

export async function measurePatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { measure_uuid, confirmed_value } = req.body;

  try {
    const ResponseMeasure = await measureService.patchMeasure(
      measure_uuid,
      confirmed_value
    );
    return res.status(200).send(ResponseMeasure);
  } catch (err) {
    next(err);
  }
}

export async function measureGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  try {
    const ResponseMeasure = await measureService.getCustomer(
      customer_code,
      measure_type
    );
    return res.status(200).send(ResponseMeasure);
  } catch (err) {
    next(err);
  }
}
