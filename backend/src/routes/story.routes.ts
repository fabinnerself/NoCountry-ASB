import { Router } from 'express';
import { generateStoryHandler } from '../controllers/story.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { StoryRequestSchema } from '../schemas/storyRequest.schema';

const router = Router();

router.post('/generate-story', validateRequest(StoryRequestSchema), generateStoryHandler);

export default router;
