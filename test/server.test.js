const request = require('supertest');
const app = require('../src/server');

describe('V0.9 - basic API', () => {
    test('GET /health returns ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('ok');
    });

    test('GET /api/tasks returns array of tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('title');
    });
});
