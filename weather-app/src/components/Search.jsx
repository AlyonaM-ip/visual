import { useState } from 'react';

function Search({ onCityChange }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) {
      onCityChange(value.trim());
      setValue('');
    }
  }

  return (
    <header className="header">
      <nav className="search">
        <input
          type="search"
          className="search_input"
          placeholder="Enter location name"
          aria-label="Search location"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="search_button" onClick={handleSubmit}>
          Search
        </button>
      </nav>
    </header>
  );
}

export default Search;