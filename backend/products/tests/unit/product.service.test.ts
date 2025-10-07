import { ProductModel } from '../../src/apis/models/Product';
import { ProductService } from '../../src/apis/services/product.service';
import { sampleProducts } from '../fixtures/product.fixtures';
import { describe,test,expect,beforeEach,beforeAll } from '@jest/globals';

describe('ProductService - Unit Tests', () => {
  let productService: ProductService;

  beforeAll(() => {
    productService = new ProductService();
  });

  beforeEach(async () => {
    await ProductModel.deleteMany({});
  });

  test('getProducts should return empty array on empty DB', async () => {
    const result = await productService.getProducts({}, 1, 10);
    expect(result.products).toHaveLength(0);
    expect(result.pagination.total).toBe(0);
  });

  test('getProducts should filter by stock_status', async () => {
    await ProductModel.insertMany(sampleProducts);
    const result = await productService.getProducts({ stock_status: 'instock' }, 1, 10);
    expect(result.products.length).toBeGreaterThan(0);
    result.products.forEach((product: { stock_status: any; }) => {
      expect(product.stock_status).toBe('instock');
    });
  });
});
