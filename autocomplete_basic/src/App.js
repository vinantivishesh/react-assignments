import React, { useState } from 'react';
import useDebounce from './hooks/useDebounce';

var data = require('./MOCKDATA.json');

export default function App() {
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedSearch = useDebounce(value, 1000);

  const onChange = (e) => {
    setValue(e.target.value);
    setShowDropdown(true);
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
          {data
            .filter((item) => {
              const searchTerm = debouncedSearch.toLowerCase();
              const fullName = item.full_name.toLowerCase();
              return searchTerm && fullName.startsWith(searchTerm);
            })
            .slice(0, 10)
            .map((item, index) => (
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
