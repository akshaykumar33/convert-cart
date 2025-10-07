import { Request, Response, NextFunction } from 'express';
import{ logger} from '@/apis/middlewares/logger';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.status || 500;
  const payload = {
    message: err?.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' ? { stack: err?.stack } : {})
  };

  logger.error('HTTP %d - %s', status, err?.message, { stack: err?.stack });
  res.status(status).json(payload);
}

