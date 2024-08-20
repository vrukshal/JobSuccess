import React from 'react'
import JobPosts from './JobPosts'
import RecruiterSidebar from '../RecruiterSidebar';
import RecruiterNavbar from '../RecruiterNavbar';
function JobPostsMainPage() {
  return (
    <div className="recruiter-main-page">
      <RecruiterSidebar />
      <div className="main-section">
          <RecruiterNavbar />
          <JobPosts />
      </div>
    </div>
  )
}

export default JobPostsMainPage;
