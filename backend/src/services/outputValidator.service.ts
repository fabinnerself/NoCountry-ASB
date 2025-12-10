import { ValidTone, ValidFormat, WORD_COUNT_MIN, WORD_COUNT_MAX } from '../constants/validation';
import { countWords } from '../utils/wordCount';
import logger from '../utils/logger';

export interface OutputValidation {
  isValid: boolean;
  wordCount: number;
  hasCorrectLength: boolean;
  hasStructure: boolean;
  matchesTone: boolean;
  hasCTA: boolean;
  hasImageContext: boolean;
  errors: string[];
}

export class OutputValidatorService {
  validate(
    story: string,
    tone: ValidTone,
    format: ValidFormat,
    imageCaptions?: string[]
  ): OutputValidation {
    logger.info('Validating output', { tone, format, hasCaptions: !!imageCaptions });

    const wordCount = countWords(story);
    const hasCorrectLength = wordCount >= WORD_COUNT_MIN && wordCount <= WORD_COUNT_MAX;
    const hasStructure = this.validateStructure(story);
    const matchesTone = this.validateTone(story, tone);
    const hasCTA = this.validateCTA(story);
    const hasImageContext = imageCaptions ? this.validateImageContext(story, imageCaptions) : true;

    const errors: string[] = [];
    if (!hasCorrectLength) {
      errors.push(`Word count (${wordCount}) must be between ${WORD_COUNT_MIN}-${WORD_COUNT_MAX}`);
    }
    if (!hasStructure) {
      errors.push('Story lacks proper structure (hook, development, closure)');
    }
    if (!matchesTone) {
      errors.push(`Story does not match requested tone: ${tone}`);
    }
    if (!hasCTA && format === 'REDES_SOCIALES') {
      errors.push('Story for REDES_SOCIALES must include a Call-to-Action');
    }
    if (!hasImageContext && imageCaptions) {
      errors.push('Story does not reflect image context');
    }

    const isValid = errors.length === 0;

    logger.info('Validation completed', { isValid, errorsCount: errors.length });

    return {
      isValid,
      wordCount,
      hasCorrectLength,
      hasStructure,
      matchesTone,
      hasCTA,
      hasImageContext,
      errors,
    };
  }

  private validateStructure(story: string): boolean {
    const sentences = story.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    return sentences.length >= 3;
  }

  private validateTone(story: string, tone: ValidTone): boolean {
    const lowerStory = story.toLowerCase();

    const toneKeywords: Record<ValidTone, string[]> = {
      INSPIRACIONAL: ['inspira', 'logr', 'éxito', 'super', 'puede', 'sueño', 'cambio'],
      EDUCATIVO: ['aprend', 'enseñ', 'conoce', 'descubr', 'importante', 'ejemplo'],
      TÉCNICO: ['proces', 'sistem', 'técnic', 'específic', 'precisión', 'método'],
    };

    const keywords = toneKeywords[tone];
    return keywords.some((keyword) => lowerStory.includes(keyword));
  }

  private validateCTA(story: string): boolean {
    const ctaPatterns = [
      /únete/i,
      /descubre/i,
      /aprende/i,
      /comienza/i,
      /participa/i,
      /comparte/i,
      /visita/i,
      /conoce más/i,
      /contáctanos/i,
      /regístrate/i,
    ];

    return ctaPatterns.some((pattern) => pattern.test(story));
  }

  private validateImageContext(story: string, imageCaptions: string[]): boolean {
    const lowerStory = story.toLowerCase();

    for (const caption of imageCaptions) {
      const keywords = caption
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 4);

      const hasMatch = keywords.some((keyword) => lowerStory.includes(keyword));
      if (hasMatch) return true;
    }

    return imageCaptions.length === 0;
  }
}
