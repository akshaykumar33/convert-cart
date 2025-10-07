import 'module-alias/register'
import mongoose from 'mongoose';
import app from './app';
import { config } from './utils/config';
import { logger } from './apis/middlewares/logger';
import { startProductSyncCron } from './utils/sync';

(async function main() {
  try {
    await mongoose.connect(config.mongoUri, {
    });
    logger.info('Connected to MongoDB');

    app.listen(config.port, () => {
      logger.info('Server listening on port %d', config.port);
    });
     // Start periodic product sync cron after server starts
    startProductSyncCron();
  } catch (err) {
    logger.error('Startup error: %o', err);
    process.exit(1);
  }
})();
