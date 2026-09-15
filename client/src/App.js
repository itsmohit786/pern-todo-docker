import React, { useState, useEffect } from "react";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDescription("");
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial" }}>
      <h2>PERN Stack Todo App (Dockerized)</h2>
      <form onSubmit={onSubmitForm} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a todo..."
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id} style={{ marginBottom: "10px" }}>
            {todo.description}{" "}
            <button
              onClick={() => deleteTodo(todo.todo_id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
