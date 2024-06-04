// Sidebar.js
import React from 'react';
import "./css/JobsSideBar.css"

const Sidebar = ({ selectedType, setSelectedType }) => {
  return (
    <div className="sidebar">
      <button
        className={selectedType === 'part-time' ? 'active' : ''}
        onClick={() => setSelectedType('part-time')}
      >
        Part-Time
      </button>
      <button
        className={selectedType === 'full-time' ? 'active' : ''}
        onClick={() => setSelectedType('full-time')}
      >
        Full-Time
      </button>
    </div>
  );
};

export default Sidebar;
