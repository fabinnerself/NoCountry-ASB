import { CohereClient } from 'cohere-ai';
import { env } from './env';
import logger from '../utils/logger';

if (!env.COHERE_API_KEY) {
  logger.error('COHERE_API_KEY not found in environment variables');
  throw new Error('COHERE_API_KEY is required');
}

export const cohereClient = new CohereClient({
  token: env.COHERE_API_KEY,
});

logger.info('Cohere client initialized successfully');
