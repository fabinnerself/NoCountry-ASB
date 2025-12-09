import { countWords } from '../../../src/utils/wordCount';

describe('Word Count Utility - TDD', () => {
  it('should count words in simple text', () => {
    const text = 'This is a simple test';
    expect(countWords(text)).toBe(5);
  });

  it('should count words with multiple spaces', () => {
    const text = 'This  has   multiple    spaces';
    expect(countWords(text)).toBe(4);
  });

  it('should count words with line breaks', () => {
    const text = 'First line\nSecond line\nThird line';
    expect(countWords(text)).toBe(6);
  });

  it('should count words with emojis correctly', () => {
    const text = '🌟 María tiene un sueño 💪';
    expect(countWords(text)).toBe(4); // emojis are not counted as words
  });

  it('should return 0 for empty string', () => {
    const text = '';
    expect(countWords(text)).toBe(0);
  });

  it('should return 0 for string with only spaces', () => {
    const text = '     ';
    expect(countWords(text)).toBe(0);
  });

  it('should handle text with tabs and newlines', () => {
    const text = 'Word1\t\tWord2\n\nWord3';
    expect(countWords(text)).toBe(3);
  });

  it('should count Spanish text correctly', () => {
    const text = 'María completó nuestro programa de emprendimiento y ahora tiene su propia panadería';
    expect(countWords(text)).toBe(12);
  });
});
