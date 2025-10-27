import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';

//parsers
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);


// app.get('/test-rejection', async (req: Request, res: Response) => {
//   Promise.reject(new Error('Test rejection'));
// });

// app.get('/test-exception', (req: Request, res: Response) => {
//   throw new Error('Test exception');
// });

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
