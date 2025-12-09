import app from './app';
import { config } from './config/env';
import { logInfo, logError } from './utils/logger';

const PORT = config.server.port;

app.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
  logInfo(`Environment: ${config.server.nodeEnv}`);
  logInfo(`Health check available at http://localhost:${PORT}/health`);
  logInfo(`API endpoint: http://localhost:${PORT}/api/generate-story`);
}).on('error', (error: Error) => {
  logError('Failed to start server', error);
  process.exit(1);
});
