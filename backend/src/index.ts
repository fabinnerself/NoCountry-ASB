import dotenv from 'dotenv';
import app from './app';
import DatabaseClient from './config/database';
import logger from './utils/logger';

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 8000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🗄️  Database: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
});

// Verificar conexión a base de datos
DatabaseClient.healthCheck()
  .then(isHealthy => {
    if (isHealthy) {
      logger.info('✅ Database connection successful');
    } else {
      logger.warn('⚠️  Database connection failed - running in degraded mode');
    }
  })
  .catch(error => {
    logger.error('❌ Database health check error:', error);
  });

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    logger.info('HTTP server closed');
    await DatabaseClient.disconnect();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    logger.info('HTTP server closed');
    await DatabaseClient.disconnect();
    process.exit(0);
  });
});

export default server;
