import React, { useState } from 'react';

export default function ToDoList({ todolist, changeStatus }) {
  return (
    <div className="todo-list-header">
      {todolist.length &&
        todolist.map((todo, index) => (
          <ToDo todo={todo} key={index} changeStatus={changeStatus} />
        ))}
    </div>
  );
}

function ToDo({ todo, key, changeStatus }) {
  const [checked, setChecked] = useState(todo.done);
  return (
    <div key={key} className="todo-list-item">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => {
            setChecked(!checked);
            changeStatus(todo.id);
          }}
        />
        {todo.done ? <del>{todo.name}</del> : todo.name}
      </label>
      {todo.subtodos?.length && (
        <ToDoList todolist={todo.subtodos} changeStatus={changeStatus} />
      )}
    </div>
  );
}
