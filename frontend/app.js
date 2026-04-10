// In production, change this to your deployed backend URL (e.g., https://your-backend.render.com/api/tasks/)
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/tasks/'
    : '/api/tasks/'; // Use relative path if proxied, or full URL otherwise.

// CORS = utilizar recursos de otros dominios/servidores

let toDoList = [];

// fetch tasks from the API
async function fetchTasks(){
    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log("Datos recibidos de la API:", data);
        
        toDoList = data;
        renderTasks();
    } catch (error){
        console.error('Error fetching tasks: ', error);
    }
}

const renderTasks = () => {
    const tasksList = document.getElementById('tasks_list');
    tasksList.innerHTML = '';
    toDoList.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.priority}</td>
            <td>${task.isCompleted}</td>
            <td>
                <button class="btn btn-sm btn-primary">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        tasksList.appendChild(row);
    });
}

//Send new task into for saving it
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const priority = document.getElementById('task-priority').value;

    const newTask = {
        title: title,
        priority: priority
    };

    try{
        const response = await fetch(API_URL,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok){
            fetchTasks();
            alert('Task added successfully!')
            taskForm.reset();
        }
    } catch(error){
        console.error('Error adding task:', error);
    }
});

window.deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });

        if (response.ok){
            fetchTasks();
            alert('Task deleted');
        }
    }catch (error) {
        console.error('Error deleting task:', error.message);

    }
};
// Call to fetch function
fetchTasks();