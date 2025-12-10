import { StoryGeneratorService } from '../../../src/services/storyGenerator.service';
import { cohereClient } from '../../../src/config/cohere';
import { mockImageBuffer, mockGeneratedStory } from '../../fixtures/testData';

jest.mock('../../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn(),
  },
}));

describe('StoryGeneratorService', () => {
  let service: StoryGeneratorService;

  beforeEach(() => {
    service = new StoryGeneratorService();
    jest.clearAllMocks();
  });

  describe('generateStory - full pipeline', () => {
    beforeEach(() => {
      (cohereClient.chat as jest.Mock).mockImplementation((params: any) => {
        if (params.message.includes('Analiza esta imagen')) {
          return Promise.resolve({
            text: 'Emprendedora joven\nEspacio de trabajo\nProductos artesanales',
          });
        }
        return Promise.resolve({ text: mockGeneratedStory });
      });
    });

    it('should generate story successfully with all components', async () => {
      const response = await service.generateStory(
        'INSPIRACIONAL',
        'REDES_SOCIALES',
        'Joven emprendedora superó obstáculos',
        mockImageBuffer,
        'image/jpeg'
      );

      expect(response.success).toBe('ok');
      expect(response.generatedStory).toBeDefined();
      expect(response.metadata.imageProcessed).toBe(true);
      expect(response.metadata.imageCaptions.length).toBeGreaterThan(0);
    });

    it('should include processing time in response', async () => {
      const response = await service.generateStory(
        'EDUCATIVO',
        'POST',
        'Aprende sobre desarrollo sostenible',
        mockImageBuffer,
        'image/png'
      );

      expect(response.metadata.processingTimeMs).toBeDefined();
      expect(typeof response.metadata.processingTimeMs).toBe('number');
      expect(response.metadata.processingTimeMs).toBeGreaterThan(0);
    });

    it('should set correct metadata fields', async () => {
      const response = await service.generateStory(
        'TÉCNICO',
        'HISTORIA',
        'Proceso técnico de implementación',
        mockImageBuffer,
        'image/webp'
      );

      expect(response.metadata).toMatchObject({
        tone: 'TÉCNICO',
        format: 'HISTORIA',
        imageProcessed: true,
        model: 'command-r-plus',
      });

      expect(response.metadata.generatedAt).toMatch(/\d{4}-\d{2}-\d{2}T/);
    });

    it('should retry on validation failure', async () => {
      const shortStory = 'Short story.';
      (cohereClient.chat as jest.Mock)
        .mockResolvedValueOnce({ text: 'Captions here' })
        .mockResolvedValueOnce({ text: shortStory })
        .mockResolvedValueOnce({ text: mockGeneratedStory });

      const response = await service.generateStory(
        'INSPIRACIONAL',
        'REDES_SOCIALES',
        'Test text input',
        mockImageBuffer,
        'image/jpeg'
      );

      expect(response.success).toBe('ok');
    });
  });

  describe('generateStory - error handling', () => {
    it('should throw error on image analysis failure', async () => {
      (cohereClient.chat as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(
        service.generateStory(
          'INSPIRACIONAL',
          'HISTORIA',
          'Test text',
          mockImageBuffer,
          'image/jpeg'
        )
      ).rejects.toThrow();
    });

    it('should throw error on LLM generation failure', async () => {
      (cohereClient.chat as jest.Mock)
        .mockResolvedValueOnce({ text: 'Captions' })
        .mockRejectedValueOnce(new Error('LLM Error'));

      await expect(
        service.generateStory('EDUCATIVO', 'POST', 'Test text', mockImageBuffer, 'image/png')
      ).rejects.toThrow('Failed to generate story');
    });
  });
});
