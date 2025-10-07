import request from 'supertest';
import app from '../../src/app';
import { describe,expect,it } from '@jest/globals';

const segmentConditionsFixture = [
  'price > 1000',
  'stockstatus contains instock',
];

describe('Segments Route Integration Tests', () => {
  it('POST /api/segments/evaluate returns matched products', async () => {
    const response = await request(app)
      .post('/api/segments/evaluate')
      .send({ conditions: segmentConditionsFixture })
      .expect(200);

    expect(response.body).toHaveProperty('conditions');
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(typeof response.body.totalMatched).toBe('number');
  });

  it('POST /api/segments/validate validates syntax', async () => {
    const response = await request(app)
      .post('/api/segments/validate')
      .send({ conditions: segmentConditionsFixture })
      .expect(200);

    expect(response.body.valid).toBe(true);
  });

  it('GET /api/segments/fields returns segment fields info', async () => {
    const response = await request(app).get('/api/segments/fields').expect(200);
    expect(response.body).toHaveProperty('fields');
    expect(response.body).toHaveProperty('operators');
    expect(response.body).toHaveProperty('examples');
  });
});
