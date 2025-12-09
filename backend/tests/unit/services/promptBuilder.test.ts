import { buildPrompt } from '../../../src/services/promptBuilder.service';
import { StoryRequest } from '../../../src/schemas/storyRequest.schema';

describe('Prompt Builder Service - TDD', () => {
  it('should build prompt with INSPIRACIONAL tone', () => {
    const request: StoryRequest = {
      tone: 'INSPIRACIONAL',
      format: 'POST',
      text: 'María completó nuestro programa de emprendimiento.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).toContain('TONO: INSPIRACIONAL');
    expect(prompt).toContain('emotivo y motivador');
    expect(prompt).toContain('María completó nuestro programa de emprendimiento.');
  });

  it('should build prompt with EDUCATIVO tone', () => {
    const request: StoryRequest = {
      tone: 'EDUCATIVO',
      format: 'HISTORIA',
      text: 'El programa enseña metodología ágil.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).toContain('TONO: EDUCATIVO');
    expect(prompt).toContain('didáctico');
    expect(prompt).toContain('El programa enseña metodología ágil.');
  });

  it('should build prompt with TÉCNICO tone', () => {
    const request: StoryRequest = {
      tone: 'TÉCNICO',
      format: 'POST',
      text: 'Implementamos sistema de gestión.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).toContain('TONO: TÉCNICO');
    expect(prompt).toContain('profesional');
    expect(prompt).toContain('Implementamos sistema de gestión.');
  });

  it('should include correct guidelines for HISTORIA format', () => {
    const request: StoryRequest = {
      tone: 'INSPIRACIONAL',
      format: 'HISTORIA',
      text: 'Contexto de prueba para historia completa.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).toContain('FORMATO: HISTORIA');
    expect(prompt).toContain('inicio, desarrollo y cierre');
  });

  it('should include correct guidelines for REDES_SOCIALES format', () => {
    const request: StoryRequest = {
      tone: 'INSPIRACIONAL',
      format: 'REDES_SOCIALES',
      text: 'Contexto para redes sociales.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).toContain('FORMATO: REDES_SOCIALES');
    expect(prompt).toContain('emojis');
    expect(prompt).toContain('hashtags');
  });

  it('should replace all placeholders correctly', () => {
    const request: StoryRequest = {
      tone: 'EDUCATIVO',
      format: 'POST',
      text: 'Test context for placeholder replacement.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).not.toContain('{tone}');
    expect(prompt).not.toContain('{toneGuidelines}');
    expect(prompt).not.toContain('{format}');
    expect(prompt).not.toContain('{formatGuidelines}');
    expect(prompt).not.toContain('{text}');
  });

  it('should include word count requirement', () => {
    const request: StoryRequest = {
      tone: 'TÉCNICO',
      format: 'OTRO',
      text: 'Context for testing word count requirement.',
    };
    const prompt = buildPrompt(request);

    expect(prompt).toContain('80 y 120 palabras');
  });
});
