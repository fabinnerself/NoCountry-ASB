import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { corsOptions } from './config/cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import logger from './utils/logger';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(routes);

  app.use(errorHandler);

  return app;
}
