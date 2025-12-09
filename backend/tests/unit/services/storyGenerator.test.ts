import { generateStory } from '../../../src/services/storyGenerator.service';
import { StoryRequest } from '../../../src/schemas/storyRequest.schema';
import { cohereClient } from '../../../src/config/cohere';

jest.mock('../../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn(),
  },
}));

const mockCohereClient = cohereClient as jest.Mocked<typeof cohereClient>;

describe('Story Generator Service - TDD', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should reject invalid tone', async () => {
      const invalidRequest = {
        tone: 'EMOTIVO',
        format: 'POST',
        text: 'Valid text with more than 20 characters here',
      } as unknown as StoryRequest;

      await expect(generateStory(invalidRequest)).rejects.toThrow();
    });

    it('should reject text shorter than 20 characters', async () => {
      const invalidRequest = {
        tone: 'INSPIRACIONAL',
        format: 'POST',
        text: 'Short',
      } as StoryRequest;

      await expect(generateStory(invalidRequest)).rejects.toThrow();
    });

    it('should reject text longer than 1000 characters', async () => {
      const invalidRequest = {
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        text: 'a'.repeat(1001),
      } as StoryRequest;

      await expect(generateStory(invalidRequest)).rejects.toThrow();
    });
  });

  describe('Story Generation', () => {
    it('should generate story with valid parameters', async () => {
      const validRequest: StoryRequest = {
        tone: 'INSPIRACIONAL',
        format: 'REDES_SOCIALES',
        text: 'María completó nuestro programa de emprendimiento y ahora tiene su propia panadería que genera empleo.',
      };

      const mockStory = `🌟 De la adversidad al éxito: La historia de María

Madre soltera, determinada, emprendedora. María no se rindió ante los desafíos. Completó nuestro programa de emprendimiento y hoy su panadería no solo sostiene a su familia, sino que también genera empleo en su comunidad.

¿Conoces a alguien con un sueño como el de María? 💪

#Emprendimiento #MujeresEmprendedoras #ImpactoSocial #Superación`;

      mockCohereClient.chat.mockResolvedValue({
        text: mockStory,
      } as never);

      const result = await generateStory(validRequest);

      expect(result.success).toBe('ok');
      expect(result.generatedStory).toBe(mockStory);
      expect(mockCohereClient.chat).toHaveBeenCalledTimes(1);
    });

    it('should include correct metadata in response', async () => {
      const validRequest: StoryRequest = {
        tone: 'EDUCATIVO',
        format: 'POST',
        text: 'El programa enseña metodología ágil a equipos de organizaciones sociales.',
      };

      const mockStory = 'word '.repeat(95).trim();
      mockCohereClient.chat.mockResolvedValue({
        text: mockStory,
      } as never);

      const result = await generateStory(validRequest);

      expect(result.metadata.tone).toBe('EDUCATIVO');
      expect(result.metadata.format).toBe('POST');
      expect(result.metadata.wordCount).toBe(95);
      expect(result.metadata.model).toBeDefined();
      expect(result.metadata.generatedAt).toBeDefined();
    });

    it('should include validation status in response', async () => {
      const validRequest: StoryRequest = {
        tone: 'TÉCNICO',
        format: 'HISTORIA',
        text: 'Implementación de sistema de gestión de proyectos para ONG.',
      };

      const mockStory = 'word '.repeat(100).trim();
      mockCohereClient.chat.mockResolvedValue({
        text: mockStory,
      } as never);

      const result = await generateStory(validRequest);

      expect(result.validation).toBeDefined();
      expect(result.validation.tone).toBe('ok');
      expect(result.validation.format).toBe('ok');
      expect(result.validation.text).toBe('ok');
    });
  });

  describe('Error Handling', () => {
    it('should handle Cohere API error', async () => {
      const validRequest: StoryRequest = {
        tone: 'INSPIRACIONAL',
        format: 'POST',
        text: 'Valid context text for testing error handling.',
      };

      mockCohereClient.chat.mockRejectedValue(new Error('API Error') as never);

      await expect(generateStory(validRequest)).rejects.toThrow('API Error');
    });

    it('should throw error if Cohere returns empty text', async () => {
      const validRequest: StoryRequest = {
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        text: 'Context for testing empty response handling.',
      };

      mockCohereClient.chat.mockResolvedValue({
        text: '',
      } as never);

      await expect(generateStory(validRequest)).rejects.toThrow();
    });
  });
});
