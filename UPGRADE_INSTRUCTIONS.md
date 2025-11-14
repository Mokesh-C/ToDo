# Upgrade Instructions: V0.9 → V1.0 → V1.1 → V1.2

This document contains concise instructions and code patches to upgrade the project through the requested versions. Apply these changes in order.

## V0.9 → V1.0 (In-memory CRUD)

Changes:

- Replace hardcoded `tasks` array with an in-memory store that supports Create, Read, Update (mark complete), Delete.
- Add routes: POST /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id
- Update tests to exercise CRUD endpoints.

Files to change:

- `src/server.js` — implement new routes and in-memory logic.
- `test/server.test.js` — add tests for POST/PUT/DELETE.

Quick patch outline (example):

1. In `src/server.js` replace the `tasks` const with `let tasks = []` and add helper to generate IDs.

2. Add endpoints:

POST /api/tasks { title } -> creates task
PUT /api/tasks/:id -> toggle completed or update title
DELETE /api/tasks/:id -> removes task

3. Update UI (`public/index.html`) to allow adding and marking tasks (optional for demo).

## V1.0 → V1.1 (Persistence)

Choices: JSON file (simple) or SQLite (more robust). For demo, JSON file persistence is easiest.

Changes:

- Add a `data/` folder and persist tasks to `data/tasks.json` on change.
- On server startup, load `data/tasks.json` if present.
- Update tests to simulate restart by writing file and reloading module (or use integration test that reads file)

Files to change:

- `src/server.js` — add load/save helper using `fs`.
- Add tests to ensure persistence.

Notes: If you choose SQLite, add `better-sqlite3` or `sqlite3` and implement simple DAO.

## V1.1 → V1.2 (Metadata & Filtering)

Changes:

- Add fields to tasks: `dueDate` (ISO string), `priority` (low,medium,high)
- Add query params on GET /api/tasks: `?priority=high&completed=false&search=book`
- Update POST to accept `dueDate` and `priority`
- Update tests to verify filtering and searching

Files to change:

- `src/server.js` — extend schema and add filtering logic.
- `test/server.test.js` — tests for metadata and filters.

## Tests and CI

- Update `package.json` scripts to include any migration steps if needed.
- The same `Dockerfile` works across versions; ensure `package.json` version is bumped for Docker tagging.

## Docker / Jenkins Notes

- When you bump application version, update the `APP_VERSION` environment variable in Jenkins or create pipeline parameters.
- Tag Docker images accordingly (v1.0, v1.1, v1.2) and push to Docker Hub.
