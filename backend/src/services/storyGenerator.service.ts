import { cohereClient } from '../config/cohere';
import { config } from '../config/env';
import { StoryRequest, StoryRequestSchema } from '../schemas/storyRequest.schema';
import { StoryResponse } from '../schemas/storyResponse.schema';
import { buildPrompt } from './promptBuilder.service';
import { validateOutput } from './outputValidator.service';
import { countWords } from '../utils/wordCount';
import { logInfo, logError } from '../utils/logger';

export async function generateStory(request: StoryRequest): Promise<StoryResponse> {
  try {
    const validatedRequest = StoryRequestSchema.parse(request);
    logInfo(`Generating story with tone: ${validatedRequest.tone}, format: ${validatedRequest.format}`);

    const prompt = buildPrompt(validatedRequest);

    const response = await cohereClient.chat({
      message: prompt,
      model: config.cohere.model,
      temperature: config.cohere.temperature,
    });

    const generatedStory = response.text;

    if (!generatedStory || generatedStory.trim().length === 0) {
      throw new Error('Cohere API returned empty story');
    }

    const validation = validateOutput(generatedStory);

    logInfo(`Story generated successfully. Word count: ${countWords(generatedStory)}`);

    return {
      success: 'ok',
      generatedStory,
      validation,
      metadata: {
        wordCount: countWords(generatedStory),
        tone: validatedRequest.tone,
        format: validatedRequest.format,
        generatedAt: new Date().toISOString(),
        model: config.cohere.model,
      },
    };
  } catch (error) {
    logError('Error generating story', error);
    throw error;
  }
}
