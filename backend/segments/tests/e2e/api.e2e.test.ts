import request from 'supertest';
import app from '../../src/app';
import { describe,expect,it } from '@jest/globals';

describe('E2E API Tests', () => {
  it('GET /api/segments/fields responds correctly', async () => {
    const response = await request(app).get('/api/segments/fields').expect(200);
    expect(response.body).toHaveProperty('fields');
  });

  it('Handles 404 routes gracefully', async () => {
    const response = await request(app).get('/nonexistentroute').expect(404);
    expect(response.body).toHaveProperty('error', 'Route not found');
  });
});
