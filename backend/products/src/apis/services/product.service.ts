import { ProductModel } from '@/apis/models/Product';
import { wooService } from '@/apis/services/wooCommerce.service';
import { logger } from '@/apis/middlewares/logger';

export class ProductService {
  // Get paginated products with filters
  async getProducts(filter: Partial<Record<string, any>>, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const query: any = {};

    if (filter.category) query.category = filter.category;
    if (filter.stock_status) query.stock_status = filter.stock_status;
    if (typeof filter.on_sale === 'boolean') query.on_sale = filter.on_sale;

    const [products, total] = await Promise.all([
      ProductModel.find(query).select('-__v').sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(query)
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Sync all products from WooCommerce (paginated)
  async syncAll(perPage = 100) {
    let page = 1;
    let totalSynced = 0;
    let totalUpdated = 0;
    let totalNew = 0;

    while (true) {
      const { products, totalPages } = await wooService.fetchProducts(page, perPage);

      if (!products.length) break;

      const bulkOps = products.map(p => {
        const transformed = wooService.transform(p);
        return {
          updateOne: {
            filter: { id: transformed.id },
            update: { $set: { ...transformed, synced_at: new Date() } },
            upsert: true
          }
        };
      });

      if (bulkOps.length) {
        const result = await ProductModel.bulkWrite(bulkOps);
        totalSynced += products.length;
        totalUpdated += (result.modifiedCount || 0);
        totalNew += (result.upsertedCount || 0);
      }

      page += 1;
      if (page > totalPages) break;
      // small delay to avoid hammering
      await new Promise((r) => setTimeout(r, 500));
    }

    logger.info('Sync complete: %d total, %d new, %d updated', totalSynced, totalNew, totalUpdated);
    return { totalSynced, totalNew, totalUpdated, syncedAt: new Date() };
  }

  // find by id
  async getById(id: number) {
    return ProductModel.findOne({ id }).lean();
  }
}

export const productService = new ProductService();
