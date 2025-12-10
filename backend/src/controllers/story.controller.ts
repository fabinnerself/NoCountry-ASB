import { Request, Response, NextFunction } from 'express';
import { StoryGeneratorService } from '../services/storyGenerator.service';
import { ValidTone, ValidFormat } from '../constants/validation';
import logger from '../utils/logger';

export class StoryController {
  private storyGenerator: StoryGeneratorService;

  constructor() {
    this.storyGenerator = new StoryGeneratorService();
  }

  async generateStory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { tone, format, text } = req.body as { tone: string; format: string; text: string };
      const buffer = req.file?.buffer;
      const mimetype = req.file?.mimetype;

      logger.info('Generating story', {
        tone,
        format,
        textLength: text?.length ?? 0,
        imageSize: buffer?.length ?? 0,
        hasImage: !!req.file,
      });

      const response = await this.storyGenerator.generateStory(
        tone as ValidTone,
        format as ValidFormat,
        text || '',
        buffer,
        mimetype
      );

      logger.info('Story generated successfully', {
        wordCount: response.metadata.wordCount,
        processingTime: response.metadata.processingTimeMs,
      });

      res.status(200).json(response);
    } catch (error) {
      logger.error('Error in story controller', { error });
      next(error);
    }
  }
}
