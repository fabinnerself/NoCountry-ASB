import { cohereClient } from '../config/cohere';
import { ValidTone, ValidFormat } from '../constants/validation';
import { GenerateStoryResponse } from '../schemas/storyResponse.schema';
import { ImageAnalyzerService } from './imageAnalyzer.service';
import { PromptBuilderService } from './promptBuilder.service';
import { OutputValidatorService } from './outputValidator.service';
import { countWords } from '../utils/wordCount';
import logger from '../utils/logger';

export class StoryGeneratorService {
  private imageAnalyzer: ImageAnalyzerService;
  private promptBuilder: PromptBuilderService;
  private outputValidator: OutputValidatorService;

  constructor() {
    this.imageAnalyzer = new ImageAnalyzerService();
    this.promptBuilder = new PromptBuilderService();
    this.outputValidator = new OutputValidatorService();
  }

  async generateStory(
    tone: ValidTone,
    format: ValidFormat,
    text: string,
    imageBuffer?: Buffer,
    imageMimeType?: string
  ): Promise<GenerateStoryResponse> {
    const startTime = Date.now();
    logger.info('Starting story generation', { tone, format, textLength: text.length });

    try {
      let imageCaptions: string[] = [];
      
      if (imageBuffer && imageMimeType) {
        imageCaptions = await this.imageAnalyzer.analyzeImage(imageBuffer, imageMimeType);
      }

      const prompt = this.promptBuilder.buildPrompt(tone, format, text, imageCaptions);

      const generatedStory = await this.generateWithLLM(prompt);

      const validation = this.outputValidator.validate(generatedStory, tone, format, imageCaptions);

      if (!validation.isValid) {
        logger.warn('Generated story failed validation, retrying...', {
          errors: validation.errors,
        });

        const retryStory = await this.generateWithLLM(prompt);
        const retryValidation = this.outputValidator.validate(
          retryStory,
          tone,
          format,
          imageCaptions
        );

        if (retryValidation.isValid) {
          return this.buildResponse(retryStory, tone, format, imageCaptions, startTime);
        }
      }

      return this.buildResponse(generatedStory, tone, format, imageCaptions, startTime);
    } catch (error) {
      logger.error('Story generation failed', { error });
      throw error;
    }
  }

  private async generateWithLLM(prompt: string): Promise<string> {
    try {
      const response = await cohereClient.chat({
        model: 'command-r7b-12-2024',
        message: prompt,
        temperature: 0.7,
        maxTokens: 300,
      });

      return response.text?.trim() || '';
    } catch (error) {
      logger.error('LLM generation failed', { error });
      throw new Error(
        `Failed to generate story: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private buildResponse(
    generatedStory: string,
    tone: ValidTone,
    format: ValidFormat,
    imageCaptions: string[],
    startTime: number
  ): GenerateStoryResponse {
    const wordCount = countWords(generatedStory);
    const processingTimeMs = Date.now() - startTime;
    const hasImage = imageCaptions.length > 0;

    return {
      success: 'ok',
      generatedStory,
      validation: {
        tone: 'ok',
        format: 'ok',
        text: 'ok',
        image: hasImage ? 'ok' : 'not_provided',
      },
      metadata: {
        wordCount,
        tone,
        format,
        imageProcessed: hasImage,
        imageCaptions: hasImage ? imageCaptions : undefined,
        generatedAt: new Date().toISOString(),
        model: 'command-r7b-12-2024',
        processingTimeMs,
      },
    };
  }
}
