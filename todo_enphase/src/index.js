import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const tasks = [
  {
    name: 'todo1',
    subtasks: ['todo11', 'todo12', 'todo13'],
  },
  {
    name: 'todo2',
    subtasks: ['todo21', 'todo22', 'todo23'],
  },
  {
    name: 'todo3',
    subtasks: ['todo31', 'todo32', 'todo33'],
  },
];

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App tasks={tasks} />
  </StrictMode>
);
