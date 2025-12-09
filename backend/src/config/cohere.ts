import { CohereClient } from 'cohere-ai';
import { config } from './env';
import { logInfo, logError } from '../utils/logger';

let cohereClient: CohereClient;

try {
  cohereClient = new CohereClient({
    token: config.cohere.apiKey,
  });
  logInfo('Cohere client initialized successfully');
} catch (error) {
  logError('Failed to initialize Cohere client', error);
  throw error;
}

export { cohereClient };
