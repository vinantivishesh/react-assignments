import React, { useState } from 'react';

export default function Form(props) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(name);
    setName('');
  };

  const handleChange = (e) => setName(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        <label>What needs to be done?</label>
      </h2>
      <input
        type="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
