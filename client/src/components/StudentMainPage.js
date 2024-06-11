import React from 'react'
import JobsList from './JobsList'
import Sidebar from './JobsSideBar';
import StudentHomeNavBar from './StudentHomeNavBar'
import "./css/StudentMainPage.css"

function StudentMainPage() {
 
  const [selectedTab, setSelectedTab] = React.useState('jobs');
  const [selectedType, setSelectedType] = React.useState('full-time');

  return (
    <div className="home">
      <StudentHomeNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
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

export default StudentMainPage
