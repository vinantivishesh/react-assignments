import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ToDo from './ToDo';
import Form from './Form';
import FilterButton from './FilterButton';
import './style.css';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const filterList = FILTER_NAMES.map((filterName) => (
    <FilterButton
      name={filterName}
      key={filterName}
      isPressed={filterName == filter}
      setFilter={setFilter}
    />
  ));

  const toggleTaskCompleted = (id) =>
    setTasks([
      ...tasks.map((t) => {
        if (t.id == id) return { ...t, completed: !t.completed };
        else return t;
      }),
    ]);

  const addTask = (name) =>
    setTasks([
      ...tasks,
      { id: `todo-${nanoid()}`, name: name, completed: false },
    ]);

  const deleteTask = (id) => setTasks([...tasks.filter((t) => t.id !== id)]);

  const editTask = (id, newName) =>
    setTasks([
      ...tasks.map((t) => {
        if (t.id == id) return { ...t, name: newName };
        else return t;
      }),
    ]);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <ToDo
        name={task.name}
        completed={task.completed}
        id={task.id}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const headingText = `${taskList.length} task(s) are remaining`;

  return (
    <div>
      To Do Matic
      <Form addTask={addTask} />
      <div>
        <div>{filterList}</div>
        <h2>{headingText}</h2>
        <ul>{taskList}</ul>
      </div>
    </div>
  );
}
