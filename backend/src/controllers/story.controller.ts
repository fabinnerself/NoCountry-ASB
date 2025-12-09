import { Request, Response, NextFunction } from 'express';
import { generateStory } from '../services/storyGenerator.service';
import { logInfo } from '../utils/logger';

export async function generateStoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    logInfo('Story generation request received');
    const result = await generateStory(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
