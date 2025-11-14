const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Hardcoded tasks for V0.9
const tasks = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Walk the dog', completed: true },
    { id: 3, title: 'Read a book', completed: false }
];

app.use(express.json());

// Serve static UI
app.use('/', express.static(path.join(__dirname, '..', 'public')));

// API: list tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Simple health
app.get('/health', (req, res) => res.send('ok'));

app.listen(PORT, () => {
    console.log(`To-Do V0.9 listening on ${PORT}`);
});

module.exports = app; // exported for tests
