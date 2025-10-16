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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
