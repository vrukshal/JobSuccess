import React from 'react';
import RecruiterSidebar from './RecruiterSidebar';
import RecruiterNavbar from './RecruiterNavbar';
import RecruiterMainContent from './RecruiterMainContent';
import './css/RecruiterMainPage.css';

function RecruiterMainPage() {
  return (
    <div className="recruiter-main-page">
      <RecruiterSidebar />
      <div className="main-section">
        <RecruiterNavbar />
        <RecruiterMainContent />
      </div>
    </div>
  )
}

export default RecruiterMainPage
