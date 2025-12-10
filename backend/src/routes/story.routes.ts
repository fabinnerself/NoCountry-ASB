import { Router, RequestHandler } from 'express';
import { StoryController } from '../controllers/story.controller';
import { uploadImage, handleMulterError } from '../middleware/multer.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { StoryRequestSchema } from '../schemas/storyRequest.schema';

const router = Router();
const storyController = new StoryController();

const generateStoryHandler: RequestHandler = (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  storyController.generateStory(req, res, next);
};

router.post(
  '/generate-story',
  uploadImage,
  handleMulterError,
  validateRequest(StoryRequestSchema),
  generateStoryHandler
);

export default router;
