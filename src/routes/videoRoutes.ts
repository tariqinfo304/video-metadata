import { Router } from 'express';
import { createVideo, modifyVideo, fetchVideos, removeVideo } from '../controllers/videoController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateVideoFields } from '../middleware/validation';

const router = Router();

router.post('/videos', authMiddleware, validateVideoFields, createVideo);
router.put('/videos/:id', authMiddleware, modifyVideo);
router.get('/videos', authMiddleware, fetchVideos);
router.delete('/videos/:id', authMiddleware, removeVideo);

export default router;
