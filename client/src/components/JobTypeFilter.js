import React from 'react';
import './css/JobTypeFilter.css';

const JobTypeFilter = ({ jobType, setJobType }) => {
  return (
    <div>
      <button
        className={`job-type-button ${jobType === 'part-time' ? 'selected' : ''}`}
        onClick={() => setJobType('part-time')}
      >
        Part-Time
      </button>
      <button
        className={`job-type-button ${jobType === 'full-time' ? 'selected' : ''}`}
        onClick={() => setJobType('full-time')}
      >
        Full-Time
      </button>
      <button
        className={`job-type-button ${jobType === 'internship' ? 'selected' : ''}`}
        onClick={() => setJobType('internship')}
      >
        Internship
      </button>
    </div>
  );
};

export default JobTypeFilter;
