import { Server } from 'http';
import { createApp } from '../../../src/app';
import request from 'supertest';
import { cohereClient } from '../../../src/config/cohere';
import { mockImageBuffer, mockGeneratedStory } from '../../fixtures/testData';
import { StoryResponse } from '../../../src/schemas/storyResponse.schema';

jest.mock('../../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn(),
  },
}));

describe('E2E: Story Generation with Image', () => {
  let server: Server;
  const app = createApp();

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (cohereClient.chat as jest.Mock).mockImplementation((params: any) => {
      if (params.message.includes('Analiza esta imagen')) {
        return Promise.resolve({
          text: 'Joven emprendedora con laptop\nProductos artesanales\nEspacio creativo',
        });
      }
      return Promise.resolve({ text: mockGeneratedStory });
    });
  });

  it('should generate complete story workflow', async () => {
    const response = await request(app)
      .post('/api/generate-story')
      .field('tone', 'INSPIRACIONAL')
      .field('format', 'REDES_SOCIALES')
      .field('text', 'Joven emprendedora superó todos los obstáculos para crear su empresa')
      .attach('image', mockImageBuffer, 'test-image.jpg');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe('ok');

    const { generatedStory, metadata } = response.body;
    const wordCount = generatedStory.split(/\s+/).length;

    expect(wordCount).toBeGreaterThanOrEqual(80);
    expect(wordCount).toBeLessThanOrEqual(120);
    expect(metadata.imageCaptions.length).toBeGreaterThan(0);
    expect(metadata.imageProcessed).toBe(true);
  });

  it('should work with different image formats', async () => {
    const formats = [
      { mime: 'image/jpeg', filename: 'test.jpg' },
      { mime: 'image/png', filename: 'test.png' },
      { mime: 'image/webp', filename: 'test.webp' },
    ];

    for (const format of formats) {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'EDUCATIVO')
        .field('format', 'POST')
        .field('text', 'Aprende sobre desarrollo sostenible y su impacto')
        .attach('image', mockImageBuffer, format.filename);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe('ok');
      expect(response.body.metadata.imageCaptions).toBeDefined();
    }
  });

  it('should handle complete workflow with all tones', async () => {
    const tones = ['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO'] as const;

    for (const tone of tones) {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', tone)
        .field('format', 'HISTORIA')
        .field('text', 'Historia de transformación digital en comunidad rural')
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(200);
      expect(response.body.metadata.tone).toBe(tone);
    }
  });

  it('should handle complete workflow with all formats', async () => {
    const formats = ['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO'] as const;

    for (const format of formats) {
      const response = await request(app)
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', format)
        .field('text', 'Emprendimiento social con impacto en la comunidad')
        .attach('image', mockImageBuffer, 'test.jpg');

      expect(response.status).toBe(200);
      expect(response.body.metadata.format).toBe(format);
    }
  });

  it('should include valid timestamps', async () => {
    const response = await request(app)
      .post('/api/generate-story')
      .field('tone', 'EDUCATIVO')
      .field('format', 'POST')
      .field('text', 'Educación digital para comunidades rurales')
      .attach('image', mockImageBuffer, 'test.jpg');

    const timestamp = new Date(response.body.metadata.generatedAt);
    expect(timestamp.getTime()).not.toBeNaN();
    expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
  });
});
