require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require('cors');

// Test database connection on startup
db.query("SELECT 1")
  .then(() => console.log("✅ Conectado a la base de datos de Railway con éxito."))
  .catch(err => {
    console.error("❌ Error de conexión a la base de datos:");
    console.error(err);
  });

const app = express();

// Middlewares
const allowedOrigin = process.env.FRONTEND_URL 
    ? (process.env.FRONTEND_URL.startsWith('http') ? process.env.FRONTEND_URL : `https://${process.env.FRONTEND_URL}`)
    : 'http://localhost:8080';

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

app.use(express.json());

// ------- Example Route -------
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ------- Routes -------

// GET all tasks
app.get('/api/tasks/', async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET an specific task
app.get('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(task[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new task
app.post('/api/tasks/', async (req, res) => {
  const query = "INSERT INTO tasks(title, priority, isCompleted) VALUES(?, ?, ?)";
  const { title, priority, isCompleted } = req.body;
  const completed = isCompleted ? 1 : 0;
  try {
    const [result] = await db.query(query, [title, priority, completed]);
    res.status(201).json({ id: result.insertId, title, priority, isCompleted: !!completed });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update a specific task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, priority, isCompleted } = req.body;
  const completed = isCompleted ? 1 : 0;
  
  try {
    const query = "UPDATE tasks SET title = ?, priority = ?, isCompleted = ? WHERE id = ?";
    const [result] = await db.query(query, [title, priority, completed, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.json({ id, title, priority, isCompleted: !!completed });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE a specific task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM tasks WHERE id = ?";
    const [result] = await db.query(query, [id]);
    res.json({ message: `Task with id ${id} deleted` });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: error.message });
  }
});


// ------- Execute server -------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
