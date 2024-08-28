//import 'reflect-metadata';
//import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { measureRoutes } from './routers';

/*import {
  userRoutes,
  authenticationRoutes,
  galeryRoutes,
  depositionRoutes,
  requestRoutes,
  serviceTypeRoutes,
  themeRoutes,
} from "./routers";
*/

import { connectDb, disconnectDB } from './config';
//import { handleApplicationErrors } from "./middlewares";
//loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/measure', measureRoutes);
/*
  .use("/user", userRoutes)
  .use("/auth", authenticationRoutes)
  .use("/galery", galeryRoutes)
  .use("/deposition", depositionRoutes)
  .use("/request", requestRoutes)
  .use("/service", serviceTypeRoutes)
  .use("/theme", themeRoutes);
*/
// .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}
/*
const port = 4000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
*/
/*
const port = 4000;
init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});
*/
export default app;
