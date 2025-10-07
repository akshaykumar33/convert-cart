import request from 'supertest';
import app from '../../src/app';
import { describe,test,expect } from '@jest/globals';

describe('API E2E Tests', () => {
  test('Health check endpoint responds', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('Full products cycle', async () => {
    const syncRes = await request(app).post('/api/products/sync');
    expect(syncRes.statusCode).toBe(200);

    const productsRes = await request(app).get('/api/products');
    expect(productsRes.statusCode).toBe(200);
    expect(Array.isArray(productsRes.body.products)).toBe(true);
  });
});
