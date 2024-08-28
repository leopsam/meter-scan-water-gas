import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

export function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: error.details.map((detail: any) => detail.message),
      });
    }
    console.log(chalk.blue(`Passed Schema Validation`));
    next();
  };
}
