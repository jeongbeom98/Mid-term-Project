document.getElementById('todo-form').onsubmit = async function(e) {
    e.preventDefault();
    const titleInput = document.getElementById('todo-title');
    const descriptionInput = document.getElementById('todo-description');
    const title = titleInput.value;
    const description = descriptionInput.value;

    try {
        const response = await fetch('http://127.0.0.1:8000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Clear inputs only if the todo was successfully added
        titleInput.value = '';
        descriptionInput.value = '';
        fetchTodos(); // Refresh the list
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to add the todo. Check the console for more information.");
    }
};

async function fetchTodos() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/todos');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const list = document.getElementById('todo-list');
        list.innerHTML = ''; // Clear the list before adding updated items

        data.forEach(todo => { // Assuming the API returns an array directly
            const item = document.createElement('li');
            item.textContent = `${todo.title}: ${todo.description}`;
            list.appendChild(item);
        });
    } catch (error) {
        console.error("There was a problem fetching the todos:", error);
    }
}

// Initial fetch of todos
fetchTodos();
