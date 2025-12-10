import { StoryRequestSchema } from '../../../src/schemas/storyRequest.schema';
import { validateImage } from '../../../src/schemas/imageValidation.schema';
import { mockImageBuffer } from '../../fixtures/testData';

describe('Validation Schemas', () => {
  describe('StoryRequest validation', () => {
    it('should accept valid tone', () => {
      const data = {
        tone: 'INSPIRACIONAL',
        format: 'HISTORIA',
        text: 'Test text with more than twenty characters',
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/jpeg',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).not.toThrow();
    });

    it('should reject invalid tone', () => {
      const data = {
        tone: 'INVALIDO',
        format: 'HISTORIA',
        text: 'Test text with more than twenty characters',
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/jpeg',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).toThrow();
    });

    it('should accept valid format', () => {
      const data = {
        tone: 'EDUCATIVO',
        format: 'REDES_SOCIALES',
        text: 'Test text with more than twenty characters',
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/png',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).not.toThrow();
    });

    it('should reject invalid format', () => {
      const data = {
        tone: 'EDUCATIVO',
        format: 'INVALIDO',
        text: 'Test text with more than twenty characters',
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/jpeg',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).toThrow();
    });

    it('should accept text with valid length (20-1000 chars)', () => {
      const data = {
        tone: 'TÉCNICO',
        format: 'POST',
        text: 'A'.repeat(100),
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/webp',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).not.toThrow();
    });

    it('should reject text with less than 20 characters', () => {
      const data = {
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        text: 'Short',
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/jpeg',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).toThrow(/at least 20/);
    });

    it('should reject text with more than 1000 characters', () => {
      const data = {
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        text: 'A'.repeat(1001),
        image: {
          buffer: mockImageBuffer,
          mimetype: 'image/jpeg',
          size: 1024,
        },
      };

      expect(() => StoryRequestSchema.parse(data)).toThrow(/not exceed 1000/);
    });
  });

  describe('Image validation', () => {
    it('should accept valid MIME types', () => {
      const validMimes = ['image/jpeg', 'image/png', 'image/webp'];

      validMimes.forEach((mimetype) => {
        const file = {
          buffer: mockImageBuffer,
          mimetype,
          size: 1024,
        };
        expect(() => validateImage(file)).not.toThrow();
      });
    });

    it('should reject invalid MIME types', () => {
      const file = {
        buffer: mockImageBuffer,
        mimetype: 'image/gif',
        size: 1024,
      };

      expect(() => validateImage(file)).toThrow(/Invalid image type/);
    });

    it('should accept files under 10MB', () => {
      const file = {
        buffer: mockImageBuffer,
        mimetype: 'image/jpeg',
        size: 5 * 1024 * 1024, // 5 MB
      };

      expect(() => validateImage(file)).not.toThrow();
    });

    it('should reject files over 10MB', () => {
      const file = {
        buffer: mockImageBuffer,
        mimetype: 'image/jpeg',
        size: 11 * 1024 * 1024, // 11 MB
      };

      expect(() => validateImage(file)).toThrow(/must not exceed/);
    });

    it('should require buffer', () => {
      const file = {
        buffer: Buffer.from(''),
        mimetype: 'image/jpeg',
        size: 1024,
      };

      expect(() => validateImage(file)).toThrow();
    });
  });
});
