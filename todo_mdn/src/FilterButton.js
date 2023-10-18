import React from 'react';

function FilterButton(props) {
  return (
    <div style={{ margin: '5px' }}>
      <button
        className="filter toggle-btn"
        key={props.id}
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
        {props.name}
      </button>
    </div>
  );
}

export default FilterButton;
