const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Data file persistence (V1.1)
const fs = require('fs');
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

// In-memory tasks store (will be loaded from file)
let tasks = [];

function nextId() {
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

async function loadTasks() {
    try {
        await fs.promises.mkdir(DATA_DIR, { recursive: true });
        const data = await fs.promises.readFile(DATA_FILE, 'utf8');
        tasks = JSON.parse(data);
    } catch (err) {
        // If file doesn't exist or invalid, seed defaults and save
        tasks = [
            { id: 1, title: 'Buy groceries', completed: false },
            { id: 2, title: 'Walk the dog', completed: true },
            { id: 3, title: 'Read a book', completed: false }
        ];
        await saveTasks();
    }
}

async function saveTasks() {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

app.use(express.json());

// Serve static UI
app.use('/', express.static(path.join(__dirname, '..', 'public')));

// API: list tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Create task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'title is required' });
    }
    const task = { id: nextId(), title: title.trim(), completed: false };
    tasks.push(task);
    saveTasks().catch(err => console.error('saveTasks error', err));
    res.status(201).json(task);
});

// Update task (partial)
app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'not found' });
    const { title, completed } = req.body;
    if (title !== undefined) task.title = String(title);
    if (completed !== undefined) task.completed = Boolean(completed);
    saveTasks().catch(err => console.error('saveTasks error', err));
    res.json(task);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    tasks.splice(idx, 1);
    saveTasks().catch(err => console.error('saveTasks error', err));
    res.status(204).end();
});

// Simple health
app.get('/health', (req, res) => res.send('ok'));

async function start() {
    await loadTasks();
    app.listen(PORT, () => {
        console.log(`To-Do app listening on ${PORT}`);
    });
}

// If run directly, start server. When required by tests, don't auto-start.
if (require.main === module) {
    start();
}

module.exports = { app, start, loadTasks };
