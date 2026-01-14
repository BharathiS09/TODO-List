import { useEffect, useState } from "react";
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from "./templates/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const res = await fetchTodos();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const res = await createTodo({ title: input, completed: false });
      setTasks(prev => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Error creating todo", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      const res = await toggleTodo(task.id, {
        ...task,
        completed: !task.completed,
      });
      setTasks(prev => prev.map(t => (t.id === task.id ? res.data : t)));
    } catch (err) {
      console.error("Error toggling todo", err);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditInput(task.title);
  };

  const saveEdit = async (task) => {
    try {
      const res = await toggleTodo(task.id, {
        ...task,
        title: editInput,   // update title
      });
      setTasks(prev => prev.map(t => (t.id === task.id ? res.data : t)));
      setEditingId(null);
      setEditInput("");
    } catch (err) {
      console.error("Error updating todo", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {editingId === task.id ? (
              <>
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => saveEdit(task)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTask(task)}>{task.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(task);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(task.id);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
