const request = require('supertest');
const fs = require('fs').promises;
const path = require('path');
const app = require('../src/index');

describe('OCR API Tests', () => {
  test('GET /health returns ok status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('POST /get-text returns text from image', async () => {
    const imagePath = path.join(__dirname, 'fixtures/sample.png');
    const response = await request(app)
      .post('/get-text')
      .attach('image', imagePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('text');
  });

  test('POST /get-bboxes returns bounding boxes', async () => {
    const imagePath = path.join(__dirname, 'fixtures/sample.png');
    const response = await request(app)
      .post('/get-bboxes')
      .attach('image', imagePath)
      .field('type', 'word');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bboxes');
    expect(Array.isArray(response.body.bboxes)).toBe(true);
  });
});