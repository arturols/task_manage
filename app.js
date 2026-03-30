const API_URL = 'http://localhost:3000/api/tasks/';

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
            <td>${task.isCompleted ? 'Yes' : 'No'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="openEditModal(${task.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        tasksList.appendChild(row);
    });
}

const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
const editTaskForm = document.getElementById('edit-task-form');
const editTaskIdInput = document.getElementById('edit-task-id');
const editTaskTitleInput = document.getElementById('edit-task-title');
const editTaskPriorityInput = document.getElementById('edit-task-priority');
const editTaskCompletedInput = document.getElementById('edit-task-completed');

window.openEditModal = (id) => {
    const task = toDoList.find(task => task.id === id);
    if (!task) return;

    editTaskIdInput.value = task.id;
    editTaskTitleInput.value = task.title;
    editTaskPriorityInput.value = task.priority;
    editTaskCompletedInput.checked = !!task.isCompleted;
    editTaskModal.show();
};

editTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = editTaskIdInput.value;
    const updatedTask = {
        title: editTaskTitleInput.value,
        priority: editTaskPriorityInput.value,
        isCompleted: editTaskCompletedInput.checked
    };

    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        if (response.ok) {
            fetchTasks();
            editTaskModal.hide();
            alert('Task updated successfully!');
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
});

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
    } catch (error) {
        console.error('Error deleting task:', error.message);
    }
};

// Call to fetch function
fetchTasks();