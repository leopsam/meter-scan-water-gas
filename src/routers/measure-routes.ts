import { Router } from 'express';
import {
  measurePost,
  measurePatch,
  measureGet,
} from '../controllers/measure-controller';
import { validateSchema } from '../middlewares/schemaValidation-middleware';
import { measureSchema, measurePatshSchema } from '../schema';

const measureRoutes = Router();

measureRoutes
  .post('/upload', validateSchema(measureSchema), measurePost)
  .patch('/confirm', validateSchema(measurePatshSchema), measurePatch)
  .get('/:customer_code/list', measureGet);

export { measureRoutes };
