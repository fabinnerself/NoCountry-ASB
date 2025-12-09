import { StoryResponseSchema, ValidationStatusEnum } from '../../../src/schemas/storyResponse.schema';

describe('StoryResponse Schema - TDD', () => {
  describe('ValidationStatus Enum', () => {
    it('should accept "ok" as valid status', () => {
      const result = ValidationStatusEnum.safeParse('ok');
      expect(result.success).toBe(true);
    });

    it('should accept "error" as valid status', () => {
      const result = ValidationStatusEnum.safeParse('error');
      expect(result.success).toBe(true);
    });

    it('should reject invalid status', () => {
      const result = ValidationStatusEnum.safeParse('invalid');
      expect(result.success).toBe(false);
    });
  });

  describe('Complete Response Validation', () => {
    it('should accept valid complete response', () => {
      const data = {
        success: 'ok',
        generatedStory: 'This is a generated story for testing purposes.',
        validation: {
          tone: 'ok',
          format: 'ok',
          text: 'ok',
        },
        metadata: {
          wordCount: 95,
          tone: 'INSPIRACIONAL',
          format: 'REDES_SOCIALES',
          generatedAt: new Date().toISOString(),
          model: 'command-r-plus',
        },
      };
      const result = StoryResponseSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject response with missing success field', () => {
      const data = {
        generatedStory: 'Story text',
        validation: { tone: 'ok', format: 'ok', text: 'ok' },
        metadata: {
          wordCount: 95,
          tone: 'INSPIRACIONAL',
          format: 'POST',
          generatedAt: new Date().toISOString(),
          model: 'command-r-plus',
        },
      };
      const result = StoryResponseSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject response with missing generatedStory', () => {
      const data = {
        success: 'ok',
        validation: { tone: 'ok', format: 'ok', text: 'ok' },
        metadata: {
          wordCount: 95,
          tone: 'EDUCATIVO',
          format: 'HISTORIA',
          generatedAt: new Date().toISOString(),
          model: 'command-r-plus',
        },
      };
      const result = StoryResponseSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject response with invalid validation object', () => {
      const data = {
        success: 'ok',
        generatedStory: 'Story',
        validation: { tone: 'ok', format: 'invalid' }, // missing text, invalid format value
        metadata: {
          wordCount: 95,
          tone: 'TÉCNICO',
          format: 'POST',
          generatedAt: new Date().toISOString(),
          model: 'command-r-plus',
        },
      };
      const result = StoryResponseSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject response with missing metadata fields', () => {
      const data = {
        success: 'ok',
        generatedStory: 'Story text',
        validation: { tone: 'ok', format: 'ok', text: 'ok' },
        metadata: {
          wordCount: 95,
          tone: 'INSPIRACIONAL',
          // missing format, generatedAt, model
        },
      };
      const result = StoryResponseSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject response with invalid ISO 8601 timestamp', () => {
      const data = {
        success: 'ok',
        generatedStory: 'Story',
        validation: { tone: 'ok', format: 'ok', text: 'ok' },
        metadata: {
          wordCount: 95,
          tone: 'EDUCATIVO',
          format: 'REDES_SOCIALES',
          generatedAt: 'invalid-date',
          model: 'command-r-plus',
        },
      };
      const result = StoryResponseSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
