# To-Do List Application (CI/CD demo)

This repository contains a small To-Do List application used to demonstrate a CI/CD pipeline with GitHub, Jenkins and Docker. It includes multiple versions (V0.9 → V1.0 → V1.1 → V1.2). This workspace currently contains the full code for V0.9 and instructions to upgrade to later versions.

## V0.9 - Initial Setup

- Hardcoded tasks in server
- No persistence
- Simple static UI at `/`
- Basic tests with Jest + Supertest

Run locally:

```powershell
npm ci
npm start
# Open http://localhost:3000
```

Run tests:

```powershell
npm test
```

Docker build & push (replace `myname` with your Docker Hub username):

```powershell
docker build -t myname/todo-app:v0.9 .
docker push myname/todo-app:v0.9
```

Jenkins

- The included `Jenkinsfile` performs: checkout, npm ci, npm test, docker build, docker push, and deploy (stop old container, run new container).
- Create credentials in Jenkins named `docker-hub-creds` (username/password).

Upgrade notes and patches for V1.0 → V1.2 are described below in the file `UPGRADE_INSTRUCTIONS.md`.
