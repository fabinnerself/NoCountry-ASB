import { Router } from 'express';
import storyRoutes from './story.routes';

const router = Router();

router.use('/api', storyRoutes);

export default router;
