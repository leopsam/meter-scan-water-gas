import { Router } from 'express';
import { getAllMeasure } from '../controllers/measure-controller';
//import { validateSchema } from "../middlewares/schemaValidation-middleware";
//import { signInSchema } from "../schema/auth-schemas";

const measureRoutes = Router();

measureRoutes.get('/all', /*validateSchema(signInSchema),*/ getAllMeasure);

export { measureRoutes };
