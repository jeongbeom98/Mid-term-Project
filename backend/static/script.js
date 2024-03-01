document.getElementById('todo-form').onsubmit = async function(e) {
    e.preventDefault();
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-description').value;
    // Update the URL to include the full path where your FastAPI server is running
    const response = await fetch('http://127.0.0.1:8000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed: false }),
    });
    const result = await response.json();
    if (result) {
        fetchTodos(); // Refresh the list
    }
};

async function fetchTodos() {
    // Update the URL to include the full path where your FastAPI server is running
    const response = await fetch('http://127.0.0.1:8000/api/todos');
    const data = await response.json();
    const list = document.getElementById('todo-list');
    list.innerHTML = ''; // Clear the list before adding updated items
    data.todos.forEach(todo => {
        const item = document.createElement('li');
        item.textContent = `${todo.title}: ${todo.description}`;
        list.appendChild(item);
    });
}

// Initial fetch of todos
fetchTodos();
