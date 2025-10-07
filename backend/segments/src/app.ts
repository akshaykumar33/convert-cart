import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import { httpLogger } from './apis/middlewares/logger';
import { errorHandler } from './apis/middlewares/error';

import { config } from './utils/config';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// HTTP logging
app.use(httpLogger);

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // e.g., 15 mins
  max: config.rateLimit.max, // e.g., 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// routes


// 404
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

// error handler
app.use(errorHandler);

export default app;
