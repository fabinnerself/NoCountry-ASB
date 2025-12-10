import { OutputValidatorService } from '../../../src/services/outputValidator.service';
import { mockGeneratedStory } from '../../fixtures/testData';

describe('OutputValidatorService', () => {
  let service: OutputValidatorService;

  beforeEach(() => {
    service = new OutputValidatorService();
  });

  describe('validate - word count', () => {
    it('should accept story with 80-120 words', () => {
      const result = service.validate(mockGeneratedStory, 'INSPIRACIONAL', 'REDES_SOCIALES');

      expect(result.hasCorrectLength).toBe(true);
      expect(result.wordCount).toBeGreaterThanOrEqual(80);
      expect(result.wordCount).toBeLessThanOrEqual(120);
    });

    it('should reject story with less than 80 words', () => {
      const shortStory = 'Esta es una historia muy corta que no cumple requisitos.';
      const result = service.validate(shortStory, 'EDUCATIVO', 'POST');

      expect(result.hasCorrectLength).toBe(false);
      expect(result.errors.some((e) => e.includes('Word count'))).toBe(true);
    });

    it('should reject story with more than 120 words', () => {
      const longStory = 'palabra '.repeat(130);
      const result = service.validate(longStory, 'TÉCNICO', 'HISTORIA');

      expect(result.hasCorrectLength).toBe(false);
    });
  });

  describe('validate - structure', () => {
    it('should validate proper structure', () => {
      const result = service.validate(mockGeneratedStory, 'INSPIRACIONAL', 'REDES_SOCIALES');

      expect(result.hasStructure).toBe(true);
    });

    it('should reject story without structure', () => {
      const poorStory = 'Una simple frase sin desarrollo ni cierre';
      const result = service.validate(poorStory, 'EDUCATIVO', 'POST');

      expect(result.hasStructure).toBe(false);
    });
  });

  describe('validate - CTA', () => {
    it('should require CTA for REDES_SOCIALES', () => {
      const storyWithCTA = mockGeneratedStory;
      const result = service.validate(storyWithCTA, 'INSPIRACIONAL', 'REDES_SOCIALES');

      expect(result.hasCTA).toBe(true);
    });

    it('should not require CTA for other formats', () => {
      const storyWithoutCTA = `María estudiaba programación en una pequeña ciudad latinoamericana donde las oportunidades eran escasas. Cada día dedicaba varias horas a mejorar sus habilidades técnicas mediante cursos en línea gratuitos y proyectos personales desafiantes. Enfrentaba múltiples desafíos constantes relacionados con la conectividad, pero su gran determinación la llevaba adelante siempre hacia sus objetivos. Sus esfuerzos sostenidos finalmente dieron frutos positivos cuando consiguió su primer empleo formal como desarrolladora profesional. La experiencia valiosa le enseñó que el esfuerzo constante y dedicado genera resultados exitosos. Continuó creciendo profesionalmente en su carrera y alcanzó metas importantes que antes parecían completamente imposibles de lograr para ella.`;
      const result = service.validate(storyWithoutCTA, 'EDUCATIVO', 'HISTORIA');

      expect(result.hasCTA).toBe(false);
      expect(result.hasCorrectLength).toBe(true);
      expect(result.hasStructure).toBe(true);
    });

    it('should reject REDES_SOCIALES without CTA', () => {
      const storyNoCTA = 'Historia sin CTA. '.repeat(15);
      const result = service.validate(storyNoCTA, 'INSPIRACIONAL', 'REDES_SOCIALES');

      expect(result.hasCTA).toBe(false);
      expect(result.errors.some((e) => e.includes('Call-to-Action'))).toBe(true);
    });
  });

  describe('validate - tone matching', () => {
    it('should match INSPIRACIONAL tone', () => {
      const result = service.validate(mockGeneratedStory, 'INSPIRACIONAL', 'REDES_SOCIALES');

      expect(result.matchesTone).toBe(true);
    });

    it('should detect tone mismatch', () => {
      const technicalStory =
        'El sistema procesa datos mediante algoritmos específicos. Proceso técnico preciso. '.repeat(
          10
        );
      const result = service.validate(technicalStory, 'INSPIRACIONAL', 'POST');

      expect(result.matchesTone).toBe(false);
    });
  });

  describe('validate - image context', () => {
    it('should validate image context is present', () => {
      const captions = ['emprendedora', 'artesanía', 'productos'];
      const result = service.validate(
        mockGeneratedStory,
        'INSPIRACIONAL',
        'REDES_SOCIALES',
        captions
      );

      expect(result.hasImageContext).toBe(true);
    });

    it('should accept story without captions parameter', () => {
      const result = service.validate(mockGeneratedStory, 'EDUCATIVO', 'POST');

      expect(result.hasImageContext).toBe(true);
    });

    it('should detect missing image context', () => {
      const captions = ['robot', 'tecnología', 'fábrica'];
      const result = service.validate(
        mockGeneratedStory,
        'INSPIRACIONAL',
        'REDES_SOCIALES',
        captions
      );

      expect(result.hasImageContext).toBe(false);
    });
  });
});
