import React from 'react';
import Sidebar from './Sidebar';
import RecruiterNavbar from './RecruiterNavbar';
import RecruiterMainContent from './RecruiterMainContent';
import './css/RecruiterMainPage.css';

function RecruiterMainPage() {
  return (
    <div className="recruiter-main-page">
      <Sidebar />
      <div className="main-section">
        <RecruiterNavbar />
        <RecruiterMainContent />
      </div>
    </div>
  )
}

export default RecruiterMainPage
