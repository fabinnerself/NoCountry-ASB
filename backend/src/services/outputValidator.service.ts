import { countWords } from '../utils/wordCount';
import { config } from '../config/env';

export function validateOutput(story: string) {
  const wordCount = countWords(story);
  const minWords = config.validation.storyMinWords;
  const maxWords = config.validation.storyMaxWords;

  return {
    tone: 'ok' as const,
    format: 'ok' as const,
    text: wordCount >= minWords && wordCount <= maxWords ? ('ok' as const) : ('error' as const),
  };
}
