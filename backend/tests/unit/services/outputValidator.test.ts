import { validateOutput } from '../../../src/services/outputValidator.service';

describe('Output Validator Service - TDD', () => {
  it('should return "ok" for story with exactly 80 words (minimum)', () => {
    const story = 'word '.repeat(80).trim();
    const result = validateOutput(story);

    expect(result.text).toBe('ok');
  });

  it('should return "ok" for story with exactly 120 words (maximum)', () => {
    const story = 'word '.repeat(120).trim();
    const result = validateOutput(story);

    expect(result.text).toBe('ok');
  });

  it('should return "ok" for story with 100 words (within range)', () => {
    const story = 'word '.repeat(100).trim();
    const result = validateOutput(story);

    expect(result.text).toBe('ok');
  });

  it('should return "error" for story with 79 words (below minimum)', () => {
    const story = 'word '.repeat(79).trim();
    const result = validateOutput(story);

    expect(result.text).toBe('error');
  });

  it('should return "error" for story with 121 words (above maximum)', () => {
    const story = 'word '.repeat(121).trim();
    const result = validateOutput(story);

    expect(result.text).toBe('error');
  });

  it('should always return "ok" for tone validation', () => {
    const story = 'word '.repeat(100).trim();
    const result = validateOutput(story);

    expect(result.tone).toBe('ok');
  });

  it('should always return "ok" for format validation', () => {
    const story = 'word '.repeat(100).trim();
    const result = validateOutput(story);

    expect(result.format).toBe('ok');
  });

  it('should validate Spanish text correctly', () => {
    const story = `María era una madre soltera de tres hijos que enfrentaba muchas dificultades económicas y personales. 
    Un día decidió inscribirse en nuestro programa de emprendimiento social. Con dedicación, esfuerzo y perseverancia, 
    aprendió nuevas habilidades empresariales y desarrolló un completo plan de negocio. Después de meses de trabajo, 
    María finalmente logró su sueño. Hoy tiene su propia panadería artesanal que no solo sostiene económicamente a 
    su familia, sino que también genera empleo para dos personas más de su comunidad. Su historia es un ejemplo 
    inspirador de superación, determinación y resiliencia que motiva a muchos emprendedores.`;

    const result = validateOutput(story);
    expect(result.text).toBe('ok');
  });
});
