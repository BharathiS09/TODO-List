import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Todos() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/todos/");
      setTasks(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <div className="Todo-app">
        <div className="app-title">
          <h2>Todo-app</h2>
          <i className="fa-solid fa-book-bookmark"></i>
        </div>

        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="add your tasks"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button>Add</button>
        </div>

        <ul id="list-container">
  {tasks.map((task) => (
    <li 
      key={task.id} 
      onClick={() => toggle(task.id)} 
      className={task.completed ? "checked" : ""}
    >
      {task.completed ? <del>{task.title}</del> : task.title}
    </li>   
  ))}
</ul>

        
      </div>
    </div>
  );
}
