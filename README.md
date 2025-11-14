# Professional To-Do Manager - CI/CD Demo 🚀

A comprehensive To-Do List application demonstrating advanced CI/CD pipelines with Jenkins, GitHub, and Docker. Features progressive version releases (V0.9 → V1.2) showcasing enterprise-level development practices.

## 🎯 Current Version: V1.2 Pro

**🌟 Advanced Task Management with Professional Features:**

### ✨ V1.2 Features
- 🎯 **Task Priorities**: High/Medium/Low priority levels with color coding
- 📅 **Due Dates**: Set and track task deadlines
- 🏷️ **Categories**: Organize tasks with tags (Personal, Work, Learning, Health, Shopping, General)
- 🔍 **Advanced Search & Filtering**: Real-time search with priority and category filters
- 💾 **File Persistence**: Automatic data saving to `data/tasks.json`
- 🎨 **Professional UI**: Enhanced Tailwind CSS design with responsive layout
- ✅ **Comprehensive Testing**: 8 test cases covering all V1.2 features

### 🛠️ Technical Stack
- **Backend**: Node.js + Express with enhanced REST API
- **Frontend**: Professional Tailwind CSS with responsive grid layout
- **Testing**: Jest + Supertest (8/8 tests passing)
- **Containerization**: Docker with multi-stage optimization
- **CI/CD**: Jenkins with dynamic versioning and automated deployment
- **Version Control**: Git with semantic versioning and automated tagging

## 🚀 Quick Start

### Local Development
```bash
npm ci
npm test    # Run all 8 tests
npm start   # Launch on http://localhost:3000
```

### Docker Deployment
```bash
# Build and run V1.2
docker build -t mokesh17/todo-app:v1.2 .
docker run -d -p 3000:3000 --name todo mokesh17/todo-app:v1.2
```

### Jenkins CI/CD Pipeline
- ✅ Automatic GitHub polling (every 2 minutes)
- ✅ Dynamic version detection from git tags
- ✅ Cross-platform compatibility (Windows/Linux)
- ✅ Automated testing and deployment
- ✅ Docker Hub integration

## 📋 Version History

| Version | Features | Status |
|---------|----------|--------|
| **V1.2** | Priorities, Due Dates, Categories, Enhanced UI | ✅ **Current** |
| **V1.1** | File Persistence, Tailwind UI | ✅ Deployed |
| **V1.0** | In-memory CRUD Operations | ✅ Deployed |
| **V0.9** | Basic Hardcoded Tasks | ✅ Deployed |

## 🔧 CI/CD Configuration

### Jenkins Setup
1. Create pipeline job pointing to this repository
2. Add Docker Hub credentials as `docker-hub-creds`
3. Enable GitHub webhook or polling trigger
4. Pipeline automatically detects version from git tags

### Automatic Deployment
- Push to `main` branch triggers build
- Git tags (e.g., `v1.2`) determine Docker image version
- Successful builds deploy to `localhost:3000`
- Full automation from code commit to production deployment

## 🎨 UI Preview
- **Professional Layout**: 4:8 grid ratio for optimal task management
- **Responsive Design**: Works seamlessly on all devices  
- **Enhanced UX**: Improved spacing, typography, and visual hierarchy
- **Advanced Filtering**: Real-time search with multiple filter options

## 📊 Testing Coverage
All V1.2 features thoroughly tested:
- ✅ Health check endpoint
- ✅ Task CRUD operations  
- ✅ Priority system validation
- ✅ Due date functionality
- ✅ Category management
- ✅ File persistence verification
- ✅ API error handling
- ✅ Backward compatibility

---

**🏆 Perfect for demonstrating professional DevOps practices and modern web development workflows!**
