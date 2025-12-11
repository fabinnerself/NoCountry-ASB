import request from 'supertest';
import app from '../../../src/app';

describe('Health Routes Integration Tests', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('database');
      expect(response.body).toHaveProperty('services');
    });

    it('should return version fase2', async () => {
      const response = await request(app).get('/health');

      expect(response.body.version).toBe('fase2');
    });

    it('should return database status', async () => {
      const response = await request(app).get('/health');

      expect(['connected', 'disconnected']).toContain(response.body.database);
    });

    it('should respond in less than 1 second', async () => {
      const startTime = Date.now();
      await request(app).get('/health');
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});
