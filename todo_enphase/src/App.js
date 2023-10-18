import React, { useState } from 'react';
import ToDoList from './ToDoList';
import { nanoid } from 'nanoid';

const createToDoList = (tasks) => {
  const createToDo = (task) => {
    return {
      id: `todo-${nanoid()}`,
      name: task,
      done: false,
    };
  };

  return tasks.map((task) => {
    let todoItem = createToDo(task.name);
    if (task.subtasks) {
      // create todo for each subtask
      todoItem = {
        ...todoItem,
        subtodos: task.subtasks.map((st) => createToDo(st)),
      };
    }
    return todoItem;
  });
};

export default function App(props) {
  const initialList = createToDoList(props.tasks);
  const [todolist, setTodolist] = useState(initialList);

  // callback function to update todo item status
  const changeStatus = (id) => {
    let updatedTodolist = todolist.map((todo) => {
      // update current todo's status
      if (todo.id === id) {
        let updatedTodo = {
          ...todo,
          done: !todo.done,
        };
        return updatedTodo;
      }
      // updated status is of subtodo of current todo
      let idx = todo?.subtodos.findIndex((st) => st.id === id);
      if (idx !== -1) {
        let subtodo = todo.subtodos[idx];
        subtodo = {
          ...subtodo,
          done: !subtodo.done,
        };
        let updatedSubtodos = todo.subtodos;
        updatedSubtodos[idx] = subtodo;
        if (updatedSubtodos.filter((st) => !st.done).length == 0)
          todo.done = true;
        let updatedTodo = {
          ...todo,
          subtodos: updatedSubtodos,
        };
        return updatedTodo;
      }
      return todo;
    });

    setTodolist(updatedTodolist);
  };

  return (
    <div>
      <h1>To Do</h1>
      <div>
        <ToDoList todolist={todolist} changeStatus={changeStatus} />
      </div>
    </div>
  );
}
