const request = require('supertest');
const { app, start } = require('../src/server');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

describe('V1.x - API (file persistence)', () => {
    beforeAll(async () => {
        // ensure tasks are loaded from file
        await start();
        await new Promise(r => setTimeout(r, 100));
    });

    afterAll(async () => {
        // Force Jest to exit cleanly
        await new Promise(resolve => setTimeout(resolve, 500));
        process.exit(0);
    });
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

    test('POST /api/tasks creates a task', async () => {
        const res = await request(app).post('/api/tasks').send({ title: 'Test task' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test task');
    });

    test('PUT /api/tasks/:id updates completed', async () => {
        // create
        const create = await request(app).post('/api/tasks').send({ title: 'To Toggle' });
        const id = create.body.id;
        const upd = await request(app).put(`/api/tasks/${id}`).send({ completed: true });
        expect(upd.statusCode).toBe(200);
        expect(upd.body.completed).toBe(true);
    });

    test('DELETE /api/tasks/:id removes task', async () => {
        const create = await request(app).post('/api/tasks').send({ title: 'To Delete' });
        const id = create.body.id;
        const del = await request(app).delete(`/api/tasks/${id}`);
        expect(del.statusCode).toBe(204);
    });

    // ensure persistence: start the server to load and then save file exists
    test('Persistence: tasks file exists after operations', async () => {
        // give some time for saveTasks to finish (saves are async)
        await new Promise(r => setTimeout(r, 200));
        const exists = fs.existsSync(DATA_FILE);
        expect(exists).toBe(true);
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        expect(Array.isArray(data)).toBe(true);
    });
});
