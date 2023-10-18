import React, { useState } from 'react';

export default function ToDo(props) {
  const [complete, setComplete] = useState(props.completed);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li key={props.id}>
      <div>
        <input
          id="todo-0"
          type="checkbox"
          checked={complete}
          onChange={() => {
            props.toggleTaskCompleted(props.id);
            setComplete(!complete);
          }}
        />
        <label htmlFor={props.id}>{props.name}</label>
      </div>
      <div className="btn-group">
        <button onClick={() => props.editTask(props.id, 'new name')}>
          Edit
        </button>
        <button onClick={() => props.deleteTask(props.id)}>Delete</button>
      </div>
    </li>
  );
}
