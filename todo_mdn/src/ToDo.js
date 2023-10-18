import React, { useState } from 'react';

export default function ToDo(props) {
  const [complete, setComplete] = useState(props.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName('');
    setIsEditing(false);
  };

  const editTemplate = (
    <div>
      <div>
        <label>new name for {props.name}</label>
        <input
          id={props.id}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );

  const viewTemplate = (
    <div>
      <div>
        <input
          id={props.id}
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
        <button
          style={{
            marginRight: '5px',
          }}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          style={{
            backgroundColor: 'red',
            color: 'white',
            borderColor: 'red',
            marginLeft: '5px',
          }}
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return <li key={props.id}>{isEditing ? editTemplate : viewTemplate}</li>;
}
