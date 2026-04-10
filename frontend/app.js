// In production, change this to your deployed backend URL
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/tasks/'
    : 'https://task-manage-jead.onrender.com/api/tasks/';

// CORS = utilizar recursos de otros dominios/servidores

let toDoList = [];
let editingId = null; // Track if we are editing a task

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
                <button class="btn btn-sm btn-primary" onclick="editTask(${task.id})">Edit</button>
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

    const taskData = {
        title: title,
        priority: priority
    };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}${editingId}` : API_URL;

    try{
        const response = await fetch(url, {
            method: method,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok){
            fetchTasks();
            alert(editingId ? 'Task updated successfully!' : 'Task added successfully!');
            taskForm.reset();
            cancelEdit(); // Reset editing state
        }
    } catch(error){
        console.error('Error saving task:', error);
    }
});

// Function to put task data into form for editing
window.editTask = (id) => {
    const task = toDoList.find(t => t.id === id);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-priority').value = task.priority;
        editingId = id;
        
        // Change button text to indicate update mode
        const submitBtn = taskForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update';
        submitBtn.classList.replace('btn-primary', 'btn-warning');

        // Add a cancel button if it doesn't exist
        if (!document.getElementById('cancel-edit')) {
            const cancelBtn = document.createElement('button');
            cancelBtn.id = 'cancel-edit';
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn btn-secondary mt-4 ms-2';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = cancelEdit;
            submitBtn.parentNode.appendChild(cancelBtn);
        }
    }
};

const cancelEdit = () => {
    editingId = null;
    taskForm.reset();
    const submitBtn = taskForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Save';
    submitBtn.classList.replace('btn-warning', 'btn-primary');
    
    const cancelBtn = document.getElementById('cancel-edit');
    if (cancelBtn) cancelBtn.remove();
};

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