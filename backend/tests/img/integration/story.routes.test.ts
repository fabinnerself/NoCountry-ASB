import request from 'supertest';
import { createApp } from '../../../src/app';
import { cohereClient } from '../../../src/config/cohere';
import { mockImageBuffer, mockGeneratedStory } from '../../fixtures/testData';

jest.mock('../../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn(),
  },
}));

describe('POST /api/generate-story - Integration', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
    (cohereClient.chat as jest.Mock).mockImplementation((params: any) => {
      if (params.message.includes('Analiza esta imagen')) {
        return Promise.resolve({
          text: 'Emprendedora joven\nEspacio de trabajo moderno\nProductos artesanales',
        });
      }
      return Promise.resolve({ text: mockGeneratedStory });
    });
  });

  describe('with valid parameters', () => {
    it('should generate story successfully', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', 'REDES_SOCIALES')
        .field('text', 'Historia de emprendimiento exitoso en comunidad rural')
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe('ok');
      expect(response.body.generatedStory).toBeDefined();
      expect(response.body.metadata.imageProcessed).toBe(true);
      expect(response.body.metadata.imageCaptions.length).toBeGreaterThan(0);
    });

    it('should validate response structure', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'EDUCATIVO')
        .field('format', 'POST')
        .field('text', 'Aprende sobre inteligencia artificial y su impacto')
        .attach('image', mockImageBuffer, 'test.png');

      expect(response.body).toMatchObject({
        success: 'ok',
        generatedStory: expect.any(String),
        validation: {
          tone: 'ok',
          format: 'ok',
          text: 'ok',
          image: 'ok',
        },
        metadata: {
          wordCount: expect.any(Number),
          tone: 'EDUCATIVO',
          format: 'POST',
          imageProcessed: true,
          imageCaptions: expect.any(Array),
          generatedAt: expect.any(String),
          model: expect.any(String),
        },
      });
    });

    it('should include processing time in metadata', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'TÉCNICO')
        .field('format', 'HISTORIA')
        .field('text', 'Proceso técnico de desarrollo de software moderno')
        .attach('image', mockImageBuffer, 'test.webp');

      expect(response.body.metadata.processingTimeMs).toBeDefined();
      expect(typeof response.body.metadata.processingTimeMs).toBe('number');
    });
  });

  describe('validation errors', () => {
    it('should reject invalid tone', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'INVALIDO')
        .field('format', 'HISTORIA')
        .field('text', 'Test text with sufficient length for validation')
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe('error');
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('tone');
    });

    it('should reject invalid format', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'EDUCATIVO')
        .field('format', 'INVALIDO')
        .field('text', 'Test text with sufficient length for validation')
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('format');
    });

    it('should reject text with less than 20 characters', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', 'HISTORIA')
        .field('text', 'Short')
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('at least 20');
    });

    it('should reject text with more than 1000 characters', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'EDUCATIVO')
        .field('format', 'POST')
        .field('text', 'A'.repeat(1001))
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('not exceed 1000');
    });

    it('should reject request without image', async () => {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', 'HISTORIA')
        .field('text', 'Test text with sufficient length');

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('file validation errors', () => {
    it('should reject oversized image', async () => {
      const largeBuffer = Buffer.alloc(11 * 1024 * 1024);

      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', 'HISTORIA')
        .field('text', 'Test text with sufficient length')
        .attach('image', largeBuffer, 'large.jpg');

      expect(response.status).toBe(413);
      expect(response.body.error.code).toBe('FILE_ERROR');
    });
  });
});
