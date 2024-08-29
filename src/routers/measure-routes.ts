import { Router } from 'express';
import { measurePost } from '../controllers/measure-controller';
import { validateSchema } from '../middlewares/schemaValidation-middleware';
import { measureSchema } from '../schema/measure-schemas';

const measureRoutes = Router();

measureRoutes.post('/upload', validateSchema(measureSchema), measurePost);

export { measureRoutes };
