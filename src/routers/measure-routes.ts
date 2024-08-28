import { Router } from 'express';
import { getAllMeasure, measurePost } from '../controllers/measure-controller';
import { validateSchema } from '../middlewares/schemaValidation-middleware';
import { measureSchema } from '../schema/measure-schemas';

const measureRoutes = Router();

measureRoutes
  .get('/all', getAllMeasure) //retirar depois
  .post('/upload', validateSchema(measureSchema), measurePost);

export { measureRoutes };
