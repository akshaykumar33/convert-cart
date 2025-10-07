import request from 'supertest';
import app from '../../src/app';
import { ProductModel } from '../../src/apis/models/Product';
import { sampleProducts } from '../fixtures/product.fixtures';
import { describe,test,expect,beforeEach } from '@jest/globals';

describe('Products API - Integration', () => {
  beforeEach(async () => {
    await ProductModel.deleteMany({});
  });

  test('GET /api/products returns empty list initially', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.products).toHaveLength(0);
  });

  test('GET /api/products returns products', async () => {
    await ProductModel.insertMany(sampleProducts);
    const res = await request(app).get('/api/products?limit=10');
    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(sampleProducts.length);
  });

  test('POST /api/products/sync triggers sync', async () => {
    const res = await request(app).post('/api/products/sync');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/sync/i);
  });
});
