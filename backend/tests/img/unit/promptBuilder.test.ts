import { PromptBuilderService } from '../../../src/services/promptBuilder.service';
import { validTestData } from '../../fixtures/testData';

describe('PromptBuilderService', () => {
  let service: PromptBuilderService;

  beforeEach(() => {
    service = new PromptBuilderService();
  });

  describe('buildPrompt - with captions', () => {
    it('should include visual context section', () => {
      const prompt = service.buildPrompt(
        validTestData.tone,
        validTestData.format,
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).toContain('CONTEXTO VISUAL');
      expect(prompt).toContain(validTestData.imageCaptions[0]);
    });

    it('should include all captions', () => {
      const prompt = service.buildPrompt(
        'EDUCATIVO',
        'HISTORIA',
        validTestData.text,
        validTestData.imageCaptions
      );

      validTestData.imageCaptions.forEach((caption) => {
        expect(prompt).toContain(caption);
      });
    });

    it('should include tone', () => {
      const prompt = service.buildPrompt(
        'INSPIRACIONAL',
        'POST',
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).toContain('INSPIRACIONAL');
    });

    it('should include format', () => {
      const prompt = service.buildPrompt(
        'TÉCNICO',
        'REDES_SOCIALES',
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).toContain('REDES_SOCIALES');
    });

    it('should include word count requirement', () => {
      const prompt = service.buildPrompt(
        validTestData.tone,
        validTestData.format,
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).toMatch(/80.*120.*palabras/i);
    });
  });

  describe('buildPrompt - without captions', () => {
    it('should work with empty captions array', () => {
      const prompt = service.buildPrompt('EDUCATIVO', 'HISTORIA', validTestData.text, []);

      expect(prompt).toBeDefined();
      expect(prompt).not.toContain('undefined');
      expect(prompt).toContain('EDUCATIVO');
    });

    it('should work without captions parameter', () => {
      const prompt = service.buildPrompt('TÉCNICO', 'POST', validTestData.text);

      expect(prompt).toBeDefined();
      expect(prompt).not.toContain('undefined');
    });
  });

  describe('buildPrompt - templates', () => {
    it('should include CTA requirement for REDES_SOCIALES', () => {
      const prompt = service.buildPrompt(
        'INSPIRACIONAL',
        'REDES_SOCIALES',
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).toContain('Call-to-Action');
    });

    it('should not include CTA requirement for HISTORIA', () => {
      const prompt = service.buildPrompt(
        'INSPIRACIONAL',
        'HISTORIA',
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).not.toContain('Call-to-Action');
    });

    it('should include structure requirement', () => {
      const prompt = service.buildPrompt(
        validTestData.tone,
        validTestData.format,
        validTestData.text,
        validTestData.imageCaptions
      );

      expect(prompt).toContain('Gancho');
      expect(prompt).toContain('Desarrollo');
      expect(prompt).toContain('Cierre');
    });
  });
});
