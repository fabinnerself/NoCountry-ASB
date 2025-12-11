import request from 'supertest';
import app from '../../../src/app';

describe('Story Routes Integration Tests', () => {
  describe('POST /api/generate-story', () => {
    it('should return 400 if tone is missing', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .send({
          format: 'redes sociales',
          text: 'Test story'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('tone');
    });

    it('should return 400 if format is missing', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .send({
          tone: 'inspiracional',
          text: 'Test story'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('format');
    });

    it('should return 400 if tone is invalid', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .send({
          tone: 'invalid_tone',
          format: 'redes sociales',
          text: 'Test story'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Tono inválido');
    });

    it('should return 400 if format is invalid', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .send({
          tone: 'inspiracional',
          format: 'invalid_format',
          text: 'Test story'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Formato inválido');
    });

    // Test completo requiere COHERE_API_KEY configurada
    it.skip('should generate story successfully with valid inputs', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .send({
          tone: 'inspiracional',
          format: 'redes sociales',
          text: 'Un dragón en las montañas'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.story).toBeDefined();
      expect(response.body.validation).toBeDefined();
      expect(response.body.validation.input).toBe('ok');
      expect(response.body.validation.generation).toBe('ok');
    });
  });
});
