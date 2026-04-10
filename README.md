# Task Manager - Full-Stack Deployment

A simple task management application built with Node.js, Express, MySQL, and Vanilla JS.

## Project Structure
- `/backend`: Node.js Express API.
- `/frontend`: HTML/CSS/JS client-side application.
- `/database.sql`: MySQL schema and initial data.

## Local Setup

### 1. Database
Import the `backend/database.sql` into your local MySQL server.
Create a `.env` file in the `backend` directory with the following variables:
```env
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=task_manager
FRONTEND_URL=http://localhost:8080
```

### 2. Installation
From the root directory:
```bash
npm run install:all
```

### 3. Run the Application
To run both backend and frontend concurrently:
```bash
npm run dev
```

## Deployment Guide

### Phase 1: Database (Railway / PlanetScale)
1. Create a MySQL database instance.
2. Import the schema from `backend/database.sql`.
3. Note down the connection string/credentials.

### Phase 2: Backend (Render / Railway)
1. Connect your GitHub repo.
2. Set the root directory to `backend`.
3. Configure Env Vars:
   - `PORT`: (Managed by platform)
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `FRONTEND_URL`: The URL of your deployed frontend.
4. Build Command: `npm install`
5. Start Command: `npm start`

### Phase 3: Frontend (Vercel / Netlify)
1. Connect your GitHub repo.
2. Set the root directory to `frontend`.
3. If using Vercel, it will automatically serve the static files from the root.
4. Ensure the `app.js` is updated if you need to point explicitly to the backend URL instead of relative paths.

## Technologies Used
- **Backend:** Node.js, Express, MySQL (mysql2)
- **Frontend:** HTML, CSS (Bootstrap), JavaScript
- **Deployment:** Render (Backend), Railway (Database), Vercel (Frontend)
