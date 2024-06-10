import React, { useState } from 'react';
import './css/LocationFilter.css';

const LocationFilter = ({ setLocation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [tempLocation, setTempLocation] = useState('');

  const handleSave = () => {
    setLocation(tempLocation);
    setShowPopup(false);
  };

  return (
    <div className="location-filter-container">
      <button className="location-button" onClick={() => setShowPopup(true)}>Location</button>
      {showPopup && (
        <div className="location-popup">
          <input
            type="text"
            placeholder="Enter location"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
