import { StoryRequest } from '../schemas/storyRequest.schema';
import { BASE_PROMPT, TONE_GUIDELINES, FORMAT_GUIDELINES } from '../constants/prompts';

export function buildPrompt(request: StoryRequest): string {
  const toneGuideline = TONE_GUIDELINES[request.tone];
  const formatGuideline = FORMAT_GUIDELINES[request.format];

  return BASE_PROMPT.replace('{tone}', request.tone)
    .replace('{toneGuidelines}', toneGuideline)
    .replace('{format}', request.format)
    .replace('{formatGuidelines}', formatGuideline)
    .replace('{text}', request.text);
}
