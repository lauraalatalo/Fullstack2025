import React, { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const addTask = (name) => {
    const newTask = {
      id: Date.now(),
      name,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newName) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {["All", "Active", "Completed"].map(name => (
          <button
            key={name}
            type="button"
            className="btn toggle-btn"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            <span className="visually-hidden">Show </span>
            <span>{name}</span>
            <span className="visually-hidden"> tasks</span>
          </button>
        ))}
      </div>
      <h2 id="list-heading">{filteredTasks.length} tasks remaining</h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {filteredTasks.map(task => (
          <Todo
            key={task.id}
            task={task}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
