import { countWords, isWithinWordRange } from '../../../src/utils/wordCount';
import { bufferToBase64, base64ToBuffer, validateBuffer } from '../../../src/utils/imageBuffer';
import {
  getToneErrorMessage,
  getFormatErrorMessage,
  getTextErrorMessage,
  getFileSizeErrorMessage,
  getFileTypeErrorMessage,
} from '../../../src/utils/errorMessages';

describe('Utility Functions', () => {
  describe('countWords', () => {
    it('should count words correctly', () => {
      expect(countWords('Hello world')).toBe(2);
      expect(countWords('One two three four five')).toBe(5);
    });

    it('should handle multiple spaces', () => {
      expect(countWords('Hello    world')).toBe(2);
    });

    it('should handle empty string', () => {
      expect(countWords('')).toBe(0);
    });

    it('should handle null/undefined', () => {
      expect(countWords(null as any)).toBe(0);
      expect(countWords(undefined as any)).toBe(0);
    });
  });

  describe('isWithinWordRange', () => {
    it('should return true for valid range', () => {
      const text = 'word '.repeat(100);
      expect(isWithinWordRange(text, 80, 120)).toBe(true);
    });

    it('should return false for out of range', () => {
      const text = 'word '.repeat(50);
      expect(isWithinWordRange(text, 80, 120)).toBe(false);
    });
  });

  describe('bufferToBase64', () => {
    it('should convert buffer to base64', () => {
      const buffer = Buffer.from('test data');
      const base64 = bufferToBase64(buffer);
      expect(typeof base64).toBe('string');
      expect(base64.length).toBeGreaterThan(0);
    });

    it('should throw error for non-buffer input', () => {
      expect(() => bufferToBase64('not a buffer' as any)).toThrow('Input must be a Buffer');
    });
  });

  describe('base64ToBuffer', () => {
    it('should convert base64 to buffer', () => {
      const original = Buffer.from('test data');
      const base64 = original.toString('base64');
      const buffer = base64ToBuffer(base64);
      expect(Buffer.isBuffer(buffer)).toBe(true);
      expect(buffer.toString()).toBe('test data');
    });

    it('should throw error for non-string input', () => {
      expect(() => base64ToBuffer(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('validateBuffer', () => {
    it('should return true for valid buffer', () => {
      const buffer = Buffer.from('data');
      expect(validateBuffer(buffer)).toBe(true);
    });

    it('should return false for empty buffer', () => {
      const buffer = Buffer.from('');
      expect(validateBuffer(buffer)).toBe(false);
    });

    it('should return false for non-buffer', () => {
      expect(validateBuffer('not a buffer')).toBe(false);
    });
  });

  describe('Error Messages', () => {
    it('should generate tone error message', () => {
      const message = getToneErrorMessage('INVALIDO');
      expect(message).toContain('INVALIDO');
      expect(message).toContain('INSPIRACIONAL');
    });

    it('should generate format error message', () => {
      const message = getFormatErrorMessage('INVALIDO');
      expect(message).toContain('INVALIDO');
      expect(message).toContain('HISTORIA');
    });

    it('should generate text length error message for short text', () => {
      const message = getTextErrorMessage(10);
      expect(message).toContain('al menos 20');
    });

    it('should generate text length error message for long text', () => {
      const message = getTextErrorMessage(1500);
      expect(message).toContain('no debe exceder 1000');
    });

    it('should generate file size error message', () => {
      const message = getFileSizeErrorMessage(11 * 1024 * 1024);
      expect(message).toContain('10 MB');
      expect(message).toContain('11.00 MB');
    });

    it('should generate file type error message', () => {
      const message = getFileTypeErrorMessage('image/gif');
      expect(message).toContain('image/gif');
      expect(message).toContain('image/jpeg');
    });
  });
});
