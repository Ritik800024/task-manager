const apiUrl = 'http://localhost:7000/api/tasks';  

// Fetch and display tasks
function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayTasks(data);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Display tasks in the task list
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date';
        const taskItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1 ${task.completed ? 'text-decoration-line-through' : ''}">
                        ${task.title} - <span class="badge bg-secondary">${task.category}</span>
                    </h5>
                    <p class="mb-1">${task.description}</p>
                    <small>Due Date: ${dueDateFormatted}</small>
                </div>
                <div>
                    <button class="btn btn-success btn-sm" onclick="markComplete('${task._id}', ${task.completed})" ${task.completed ? 'disabled' : ''}>Complete</button>
                    <button class="btn btn-warning btn-sm" onclick="editTask('${task._id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            </li>
        `;
        taskList.innerHTML += taskItem;
    });
}

// Create a new task
document.getElementById('createTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    if (taskTitle.trim() === '') {
        alert('Task title is required');
        return;
    }

    const task = {
        title: taskTitle,
        description: taskDescription,
        category: taskCategory,
        dueDate: taskDueDate ? new Date(taskDueDate) : null
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('createTaskForm').reset();
            fetchTasks();
        })
        .catch(error => console.error('Error:', error));
});

// Mark task as complete
function markComplete(id, completed) {
    if (completed) {
        alert('Task is already completed.');
        return;
    }

    fetch(`${apiUrl}/${id}/complete`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
    })
        .then(response => response.json())
        .then(data => {
            fetchTasks();
        })
        .catch(error => console.error('Error:', error));
}

// Edit task
function editTask(id) {
    const newTitle = prompt('Enter new task title:');
    const newDescription = prompt('Enter new task description:');
    const newCategory = prompt('Enter new category (Work, Personal, Home, Others):');
    const newDueDate = prompt('Enter new due date (YYYY-MM-DD):');

    if (newTitle.trim() === '') {
        alert('Task title cannot be empty.');
        return;
    }

    const updatedTask = {
        title: newTitle,
        description: newDescription,
        category: newCategory || 'Others',
        dueDate: newDueDate ? new Date(newDueDate) : null
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    })
        .then(response => response.json())
        .then(data => {
            fetchTasks();
        })
        .catch(error => console.error('Error:', error));
}

// Delete task
function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            fetchTasks();
        })
        .catch(error => console.error('Error:', error));
}

// Filter tasks by category
function filterTasksByCategory() {
    const category = document.getElementById('filterCategory').value;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredTasks = category ? data.filter(task => task.category === category) : data;
            displayTasks(filteredTasks);
        })
        .catch(error => console.error('Error:', error));
}

// Fetch tasks when the page loads
fetchTasks();
