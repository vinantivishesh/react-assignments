import React, { useState } from 'react';

const todoList = ['Walk the dog', 'Water the plants', 'Wash the dishes'];
const ToDo = () => {
  const [tasks, setTasks] = useState(todoList);
  const [newTask, setNewTask] = useState('');
  return (
    <div>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button
        onClick={() => {
          setTasks([...tasks, newTask]);
          setNewTask('');
        }}
      >
        Add
      </button>
      <ul>
        {tasks.map((task) => (
          <li>
            <span>{task}</span>
            <button onClick={() => setTasks(tasks.filter((t) => t !== task))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
