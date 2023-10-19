import React, { useState } from 'react';

var data = require('./MOCKDATA.json');

export default function App() {
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);
    if (searchTerm.length) {
      setShowDropdown(true);
      setSuggestions(
        data
          .filter((item) => {
            const searchString = searchTerm.toLowerCase();
            const fullName = item.full_name.toLowerCase();
            return (
              searchString &&
              fullName.startsWith(searchString) &&
              searchString !== fullName
            );
          })
          .slice(0, 10)
      );
    } else setShowDropdown(false);
  };

  return (
    <div>
      <h1>Search</h1>

      <input
        placeholder="Search here..."
        value={value}
        type="text"
        onChange={onChange}
      />

      {showDropdown && (
        <div className="dropdown">
          {suggestions.map((item, index) => (
            <div
              className="dropdown-row"
              key={index}
              onClick={() => {
                setValue(item.full_name);
                setShowDropdown(false);
              }}
            >
              {item.full_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
