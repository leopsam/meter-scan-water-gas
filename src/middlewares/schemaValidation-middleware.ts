import { Request, Response, NextFunction } from 'express';
import errors from '../errors/index';

export function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error)
      throw errors.invalidData(
        'Os dados fornecidos no corpo da requisição são inválidos'
      );
    next();
  };
}
