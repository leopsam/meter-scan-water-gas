import { Router } from 'express';
import { measurePost, measurePatch } from '../controllers/measure-controller';
import { validateSchema } from '../middlewares/schemaValidation-middleware';
import { measureSchema, measurePatshSchema } from '../schema';

const measureRoutes = Router();

measureRoutes
  .post('/upload', validateSchema(measureSchema), measurePost)
  .patch('/confirm', validateSchema(measurePatshSchema), measurePatch);

export { measureRoutes };
