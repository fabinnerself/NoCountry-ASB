import request from 'supertest';
import app from '../../src/app';
import { cohereClient } from '../../src/config/cohere';

jest.mock('../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn(),
  },
}));

const mockCohereClient = cohereClient as jest.Mocked<typeof cohereClient>;

describe('Story Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/generate-story', () => {
    it('should generate story successfully with valid data', async () => {
      const requestData = {
        tone: 'INSPIRACIONAL',
        format: 'REDES_SOCIALES',
        text: 'María completó nuestro programa de emprendimiento y ahora tiene su propia panadería.',
      };

      const mockStory = `🌟 De la adversidad al éxito: La historia de María

Madre soltera, determinada, emprendedora. María no se rindió ante los desafíos. Completó nuestro programa de emprendimiento y hoy su panadería no solo sostiene a su familia, sino que también genera empleo en su comunidad.

¿Conoces a alguien con un sueño como el de María? 💪

#Emprendimiento #MujeresEmprendedoras #ImpactoSocial`;

      mockCohereClient.chat.mockResolvedValue({
        text: mockStory,
      } as never);

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe('ok');
      expect(response.body.generatedStory).toBeDefined();
      expect(typeof response.body.generatedStory).toBe('string');
    });

    it('should return correct structure in response', async () => {
      const requestData = {
        tone: 'EDUCATIVO',
        format: 'POST',
        text: 'El programa enseña metodología ágil a equipos de organizaciones sociales.',
      };

      const mockStory = 'word '.repeat(100).trim();
      mockCohereClient.chat.mockResolvedValue({
        text: mockStory,
      } as never);

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('generatedStory');
      expect(response.body).toHaveProperty('validation');
      expect(response.body).toHaveProperty('metadata');

      expect(response.body.validation).toHaveProperty('tone');
      expect(response.body.validation).toHaveProperty('format');
      expect(response.body.validation).toHaveProperty('text');

      expect(response.body.metadata).toHaveProperty('wordCount');
      expect(response.body.metadata).toHaveProperty('tone');
      expect(response.body.metadata).toHaveProperty('format');
      expect(response.body.metadata).toHaveProperty('generatedAt');
      expect(response.body.metadata).toHaveProperty('model');
    });

    it('should reject request with invalid tone', async () => {
      const requestData = {
        tone: 'EMOTIVO',
        format: 'POST',
        text: 'Valid text with more than 20 characters',
      };

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should reject request with invalid format', async () => {
      const requestData = {
        tone: 'INSPIRACIONAL',
        format: 'BLOG',
        text: 'Valid text with more than 20 characters',
      };

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should reject request with text too short', async () => {
      const requestData = {
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        text: 'Short',
      };

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should reject request with text too long', async () => {
      const requestData = {
        tone: 'TÉCNICO',
        format: 'POST',
        text: 'a'.repeat(1001),
      };

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should handle Cohere API error gracefully', async () => {
      const requestData = {
        tone: 'INSPIRACIONAL',
        format: 'POST',
        text: 'Valid context for testing error handling.',
      };

      mockCohereClient.chat.mockRejectedValue(new Error('Cohere API Error') as never);

      const response = await request(app).post('/api/generate-story').send(requestData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.message).toBeDefined();
    });
  });
});
