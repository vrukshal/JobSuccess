import React from 'react';
import "./css/SearchBar.css";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className='search-bar'
      placeholder="Search for jobs"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
