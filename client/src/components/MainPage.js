import React from 'react'
import JobsList from './JobsList'
import Sidebar from './Sidebar';
import Navbar from './StudentHomeNavBar'
import "./css/MainPage.css"

function MainPage() {
 
  const [selectedTab, setSelectedTab] = React.useState('jobs');
  const [selectedType, setSelectedType] = React.useState('full-time');

  return (
    <div className="home">
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <hr/>
      <div className="content">
        
        <Sidebar selectedType={selectedType} setSelectedType={setSelectedType} />
        
        <main className="main-feed">
          {selectedTab === 'jobs' ? (
            <JobsList jobType={selectedType} />
          ) : (
            <div>Saved Jobs</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MainPage
