import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

export const config = {
  server: {
    port: parseInt(getOptionalEnv('PORT', '8000')),
    nodeEnv: getOptionalEnv('NODE_ENV', 'development'),
  },
  database: {
    url: getOptionalEnv(
      'DATABASE_URL',
      'postgresql://postgres:postgres@localhost:5432/autostory_db?schema=public'
    ),
  },
  cohere: {
    apiKey: getRequiredEnv('COHERE_API_KEY'),
    model: getOptionalEnv('COHERE_MODEL', 'command-r7b-12-2024'),
    temperature: parseFloat(getOptionalEnv('COHERE_TEMPERATURE', '0.7')),
    maxTokens: parseInt(getOptionalEnv('COHERE_MAX_TOKENS', '500')),
  },
  cors: {
    frontendUrlLocal: getOptionalEnv('FRONTEND_URL_LOCAL', 'http://localhost:5173'),
    frontendUrl: getOptionalEnv('FRONTEND_URL', 'https://your-frontend.vercel.app'),
  },
  validation: {
    textMinLength: parseInt(getOptionalEnv('TEXT_MIN_LENGTH', '20')),
    textMaxLength: parseInt(getOptionalEnv('TEXT_MAX_LENGTH', '1000')),
    storyMinWords: parseInt(getOptionalEnv('STORY_MIN_WORDS', '80')),
    storyMaxWords: parseInt(getOptionalEnv('STORY_MAX_WORDS', '120')),
  },
};
