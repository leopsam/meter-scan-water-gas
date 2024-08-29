import { Request, Response, NextFunction } from 'express';

export function handleApplicationErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.code === 'INVALID_DATA') {
    return res.status(400).send({
      error_code: err.code,
      error_description: err.description,
    });
  }

  if (err.code === 'DOUBLE_REPORT') {
    return res.status(409).send({
      error_code: err.code,
      error_description: err.description,
    });
  }

  if (err.code === 'MEASURE_NOT_FOUND') {
    return res.status(404).send({
      error_code: err.code,
      error_description: err.description,
    });
  }

  if (err.code === 'CONFIRMATION_DUPLICATE') {
    return res.status(409).send({
      error_code: err.code,
      error_description: err.description,
    });
  }

  if (err.code === 'INVALID_TYPE') {
    return res.status(400).send({
      error_code: err.code,
      error_description: err.description,
    });
  }

  return res.status(500).send({
    error_code: 'INTERNAL_SERVER_ERROR',
    error_description: 'Erro Interno do Servidor',
  });
}
