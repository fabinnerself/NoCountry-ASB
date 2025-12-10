import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  PORT: z.string().default('8000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  COHERE_API_KEY: z.string().min(1, 'COHERE_API_KEY is required'),
  FRONTEND_URL_LOCAL: z.string().default('http://localhost:5173'),
  FRONTEND_URL: z.string().default('https://frontend.vercel.app'),
  LOG_LEVEL: z.string().default('info'),
  MAX_FILE_SIZE: z.string().default('10485760'),
});

function validateEnv() {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
}

export const env = validateEnv();
