import winston from 'winston';
import morgan from 'morgan';
import { RequestHandler } from 'express';

// Winston logger
const jsonFormatter = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: jsonFormatter,
  defaultMeta: { service: 'product-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      )
    }),
    
     new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
  ],
});

// Morgan middleware that pipes into Winston
export const httpLogger: RequestHandler = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms :user-agent',
  {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  }
);
