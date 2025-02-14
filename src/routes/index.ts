import { Router } from 'express';
import uploadRoutes from './v1/upload';

const router = Router();

// Hook the upload routes
router.use('/v1/upload', uploadRoutes);

export default router;
