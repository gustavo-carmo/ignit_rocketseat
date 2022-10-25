import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';

import '@shared/container';

import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

createConnection();
const app = express();
app.use(rateLimiter);

app.use(express.json());
app.use(cors());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/car', express.static(`${upload.tmpFolder}/car`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

const startDate = new Date();
app.use('/', (request, response) => {
  return response
    .status(200)
    .send(`<h3>Application running since ${startDate}</h3>`);
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export default app;
