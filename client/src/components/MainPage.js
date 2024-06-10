import React from 'react';
import JobsList from './JobsList';
import Sidebar from './Sidebar';
import Navbar from './StudentHomeNavBar';
import SearchBar from './SearchBar';
import LocationFilter from './LocationFilter';
import JobTypeFilter from './JobTypeFilter';
import './css/MainPage.css';

function MainPage() {
  const [currentPage, setCurrentPage] = React.useState('Jobs');
  const [selectedTab, setSelectedTab] = React.useState('jobs');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [jobType, setJobType] = React.useState('');

  return (
    <div className="Mainhome">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} className="sidebar" />
      <div className="content">
        <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} className="navbar" />
        <hr className="hr1" />
        <div className="filter-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <LocationFilter setLocation={setLocation} />
          <JobTypeFilter jobType={jobType} setJobType={setJobType} />
        </div>
        <hr className="hr2" />
        <div className="main-feed feed">
          {selectedTab === 'jobs' ? (
            <JobsList jobType={jobType} />
          ) : (
            <div>Saved Jobs</div>
          )}
          {currentPage === 'Notifications' && <div>Notifications Page</div>}
          {currentPage === 'Events' && <div>Events Page</div>}
          {currentPage === 'Employer' && <div>Employer Page</div>}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
