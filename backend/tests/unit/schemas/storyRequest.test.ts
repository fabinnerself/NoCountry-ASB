import { StoryRequestSchema, ToneEnum, FormatEnum } from '../../../src/schemas/storyRequest.schema';

describe('StoryRequest Schema - TDD', () => {
  describe('Tone Validation', () => {
    it('should accept INSPIRACIONAL as valid tone', () => {
      const result = ToneEnum.safeParse('INSPIRACIONAL');
      expect(result.success).toBe(true);
    });

    it('should accept EDUCATIVO as valid tone', () => {
      const result = ToneEnum.safeParse('EDUCATIVO');
      expect(result.success).toBe(true);
    });

    it('should accept TÉCNICO as valid tone', () => {
      const result = ToneEnum.safeParse('TÉCNICO');
      expect(result.success).toBe(true);
    });

    it('should reject invalid tone', () => {
      const result = ToneEnum.safeParse('EMOTIVO');
      expect(result.success).toBe(false);
    });
  });

  describe('Format Validation', () => {
    it('should accept HISTORIA as valid format', () => {
      const result = FormatEnum.safeParse('HISTORIA');
      expect(result.success).toBe(true);
    });

    it('should accept POST as valid format', () => {
      const result = FormatEnum.safeParse('POST');
      expect(result.success).toBe(true);
    });

    it('should accept REDES_SOCIALES as valid format', () => {
      const result = FormatEnum.safeParse('REDES_SOCIALES');
      expect(result.success).toBe(true);
    });

    it('should accept OTRO as valid format', () => {
      const result = FormatEnum.safeParse('OTRO');
      expect(result.success).toBe(true);
    });

    it('should reject invalid format', () => {
      const result = FormatEnum.safeParse('BLOG');
      expect(result.success).toBe(false);
    });
  });

  describe('Text Validation', () => {
    it('should accept text with exactly 20 characters (minimum)', () => {
      const data = {
        tone: 'INSPIRACIONAL',
        format: 'POST',
        text: '12345678901234567890', // exactly 20 chars
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept text with exactly 1000 characters (maximum)', () => {
      const data = {
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        text: 'a'.repeat(1000), // exactly 1000 chars
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject text with less than 20 characters', () => {
      const data = {
        tone: 'TÉCNICO',
        format: 'POST',
        text: 'Short text', // 10 chars
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject text with more than 1000 characters', () => {
      const data = {
        tone: 'INSPIRACIONAL',
        format: 'REDES_SOCIALES',
        text: 'a'.repeat(1001), // 1001 chars
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('Complete Request Validation', () => {
    it('should accept valid complete request', () => {
      const data = {
        tone: 'INSPIRACIONAL',
        format: 'REDES_SOCIALES',
        text: 'María completó nuestro programa de emprendimiento y ahora tiene su propia panadería.',
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tone).toBe('INSPIRACIONAL');
        expect(result.data.format).toBe('REDES_SOCIALES');
        expect(result.data.text).toBe(data.text);
      }
    });

    it('should reject request with missing tone', () => {
      const data = {
        format: 'POST',
        text: 'Valid text with more than 20 characters here',
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject request with missing format', () => {
      const data = {
        tone: 'EDUCATIVO',
        text: 'Valid text with more than 20 characters here',
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject request with missing text', () => {
      const data = {
        tone: 'TÉCNICO',
        format: 'HISTORIA',
      };
      const result = StoryRequestSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
