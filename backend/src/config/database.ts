import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

class DatabaseClient {
  private static instance: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' 
          ? ['query', 'error', 'warn'] 
          : ['error'],
      });

      // Event listeners para logging
      DatabaseClient.instance.$on('query' as never, (e: any) => {
        logger.debug('Query:', {
          query: e.query,
          params: e.params,
          duration: `${e.duration}ms`
        });
      });

      DatabaseClient.instance.$on('error' as never, (e: any) => {
        logger.error('Database error:', e);
      });
    }
    return DatabaseClient.instance;
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseClient.instance) {
      await DatabaseClient.instance.$disconnect();
      DatabaseClient.instance = null;
      logger.info('Database disconnected');
    }
  }

  public static async healthCheck(): Promise<boolean> {
    try {
      const client = DatabaseClient.getInstance();
      await client.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      logger.error('Database health check failed:', error);
      return false;
    }
  }
}

export default DatabaseClient;
