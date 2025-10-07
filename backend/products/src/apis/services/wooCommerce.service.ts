import axios from 'axios';
import { logger } from '@/apis/middlewares/logger';
import { config } from '@/utils/config';
import { ProductDTO } from '@/types/types';

const client = axios.create({
  baseURL: config.woo.baseUrl,
  timeout: 30000
});

export class WooCommerceService {
  consumerKey = config.woo.consumerKey;
  consumerSecret = config.woo.consumerSecret;

  // fetch a page of products from WooCommerce REST API
  async fetchProducts(page = 1, perPage = 100): Promise<{ products: ProductDTO[]; totalPages: number; totalProducts: number; }> {
    try {
      const res = await client.get('/wp-json/wc/v3/products', {
        params: {
          consumer_key: this.consumerKey,
          consumer_secret: this.consumerSecret,
          page,
          per_page: perPage,
          orderby: 'date',
          order: 'desc'
        }
      });

      const totalPages = Number(res.headers['x-wp-totalpages'] || 1);
      const totalProducts = Number(res.headers['x-wp-total'] || res.data.length);
      return { products: res.data as ProductDTO[], totalPages, totalProducts };
    } catch (err: any) {
      logger.error('WooCommerce fetchProducts error: %o', err?.response?.data || err.message);
      throw new Error(`WooCommerce fetch failed: ${err?.message || 'unknown'}`);
    }
  }

  // transform WooCommerce product into ProductDTO-compatible object
  transform(woo: any): ProductDTO {
    return {
      id: woo.id,
      title: woo.name,
      price: woo.price ?? '0',
      stock_status: woo.stock_status,
      stock_quantity: woo.stock_quantity ?? null,
      category: woo.categories?.[0]?.name ?? 'Uncategorized',
      tags: (woo.tags || []).map((t: any) => t.name),
      on_sale: Boolean(woo.on_sale),
      created_at: woo.date_created
    };
  }
}

export const wooService = new WooCommerceService();
