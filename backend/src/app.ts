import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import { logInfo } from './utils/logger';

const app: Express = express();

app.use(express.json());

app.use(
  cors({
    origin: [config.cors.frontendUrlLocal, config.cors.frontendUrl, 'http://localhost:3000'],
    credentials: true,
  })
);

logInfo('CORS configured for frontend URLs');

app.use(routes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'AutoStory Builder API - Fase 0' });
});

app.use(errorHandler);

export default app;
