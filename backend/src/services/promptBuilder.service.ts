import { ValidTone, ValidFormat } from '../constants/validation';
import { buildPrompt as buildPromptTemplate } from '../constants/prompts';
import logger from '../utils/logger';

export class PromptBuilderService {
  buildPrompt(
    tone: ValidTone,
    format: ValidFormat,
    text: string,
    imageCaptions?: string[]
  ): string {
    logger.info('Building prompt', {
      tone,
      format,
      textLength: text.length,
      captionsCount: imageCaptions?.length || 0,
    });

    const prompt = buildPromptTemplate(tone, format, text, imageCaptions);

    logger.debug('Prompt built successfully', { promptLength: prompt.length });
    return prompt;
  }
}
