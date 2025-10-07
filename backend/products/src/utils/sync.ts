import cron, { ScheduledTask } from 'node-cron';
import { productService } from '@/apis/services/product.service';
import { logger } from '@/apis/middlewares/logger';
import { config } from '@/utils/config';

let syncJob: ScheduledTask | null = null;

export function startProductSyncCron() {
  if (syncJob) {
    logger.info('Product sync cron already running');
    return;
  }
  logger.info('Scheduling Product sync cron job: %s', config.syncCron);

  syncJob = cron.schedule(config.syncCron, async () => {
    logger.info('Starting scheduled product sync...');
    try {
      await productService.syncAll();
      logger.info('Scheduled product sync completed successfully');
    } catch (err) {
      logger.error('Scheduled product sync failed: %o', err);
    }
  });

  syncJob.start();
}

export function stopProductSyncCron() {
  if (syncJob) {
    syncJob.stop();
    logger.info('Stopped product sync cron job');
  }
}
