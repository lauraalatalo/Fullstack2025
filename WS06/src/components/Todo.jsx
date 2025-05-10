import React, { useState } from "react";

function Todo({ task, toggleTaskCompleted, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      editTask(task.id, newName.trim());
      setIsEditing(false);
    }
  };

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={task.id}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompleted(task.id)}
        />
        <label className="todo-label" htmlFor={task.id}>
          {task.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setIsEditing(true)}>
          Edit <span className="visually-hidden">{task.name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={() => deleteTask(task.id)}>
          Delete <span className="visually-hidden">{task.name}</span>
        </button>
      </div>
    </div>
  );

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={task.id}>
          New name for {task.name}
        </label>
        <input
          id={task.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
        </button>
      </div>
    </form>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
