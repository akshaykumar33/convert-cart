import { Router } from 'express';

const router = Router();

/**
 * GET /health
 */
router.get('/', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString(),message:'Health is Good!!' })
);

export default router;
