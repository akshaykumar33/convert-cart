import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  port: Number(process.env.PORT || 8000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/woocommerce-products',
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  }
} as const;
