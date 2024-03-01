import React, { useEffect, useState } from 'react';
import './Todo.css'; // Ensure this path is correct

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', id: null });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/todos');
    const data = await response.json();
    setTodos(data.todos || []);
  };

  const handleChange = (e, field) => {
    setNewTodo({ ...newTodo, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    const method = newTodo.id ? 'PUT' : 'POST';
    const url = newTodo.id ? `http://127.0.0.1:8000/api/todos/${newTodo.id}` : 'http://127.0.0.1:8000/api/todos';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo.title, description: newTodo.description }),
    });

    setNewTodo({ title: '', description: '', id: null }); // Reset the form
    fetchTodos(); // Refresh the todo list
  };

  const startEdit = (todo) => {
    setNewTodo(todo); // Populate the form with todo data for editing
  };

  const deleteTodo = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="todo-container">
      <div className="sequence-header">
        <h2>Make Your Yoga Sequence</h2>
      </div>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Pose"
          value={newTodo.title}
          onChange={(e) => handleChange(e, 'title')}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => handleChange(e, 'description')}
          className="input"
        />
        <button onClick={handleSubmit} className="btn add-btn">
          {newTodo.id ? 'Update' : 'Add'} Sequence
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="card-content">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="card-actions">
              <button onClick={() => startEdit(todo)} className="btn edit-btn">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
