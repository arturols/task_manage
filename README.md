# Task Manager - Full-Stack Deployment

A production-ready task management application built with Node.js, Express, MySQL, and Vanilla JS.

## Live Application
- **Frontend:** [https://task-manage-dusky.vercel.app/](https://task-manage-dusky.vercel.app/)
- **Backend API:** [https://task-manage-jead.onrender.com/api/tasks/](https://task-manage-jead.onrender.com/api/tasks/)

## Project Structure
- `/backend`: Node.js Express API.
- `/frontend`: HTML/CSS/JS client-side application.
- `backend/database.sql`: MySQL schema and initial data.

## Local Setup

### 1. Database
Import the `backend/database.sql` into your local MySQL server.

### 2. Configuration
Create a `.env` file in the `backend` directory:
```env
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task_manager
FRONTEND_URL=http://localhost:8080
```

### 3. Installation & Run
From the root directory:
```bash
npm run install:all
npm run dev
```

## Deployment Overview

### Database (Railway)
- Type: MySQL
- Public Networking: Enabled for external access.

### Backend (Render)
- Runtime: Node.js
- Root Directory: `backend`
- Env Vars: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `FRONTEND_URL`.

### Frontend (Vercel)
- Framework: Static site
- Root Directory: `frontend`
- API Communication: Auto-detects production vs local environment.

## Technologies Used
- **Database:** MySQL
- **Backend:** Node.js, Express, CORS, Dotenv
- **Frontend:** HTML5, Bootstrap 5, Vanilla JavaScript (Fetch API)
- **CI/CD:** GitHub, Vercel, Render

