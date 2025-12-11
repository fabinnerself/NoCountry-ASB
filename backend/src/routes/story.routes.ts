import { Router } from 'express';
import { generateStory } from '../controllers/story.controller';
import { upload } from '../config/multer';

const router = Router();

// POST /api/generate-story - Generar historia con IA
router.post('/generate-story', upload.single('image'), generateStory);

export default router;
