import { createApp } from './app';
import { env } from './config/env';
import logger from './utils/logger';

const app = createApp();
const PORT = parseInt(env.PORT, 10);

app.listen(PORT, () => {
  logger.info(`🚀 AutoStory Builder - Phase 1 running on port ${PORT}`);
  logger.info(`📝 Environment: ${env.NODE_ENV}`);
  logger.info(`🌐 CORS enabled for: ${env.FRONTEND_URL_LOCAL}, ${env.FRONTEND_URL}`);
  logger.info(`✅ Health check: http://localhost:${PORT}/health`);
});
