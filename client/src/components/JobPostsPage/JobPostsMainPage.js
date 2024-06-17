import React from 'react'
import JobPosts from './JobPosts'
import RecruiterSidebar from '../RecruiterSidebar';
import RecruiterNavbar from '../RecruiterNavbar';
function JobPostsMainPage() {
  return (
    <div>
        <RecruiterNavbar />
        <RecruiterSidebar />
            <JobPosts />
    </div>
  )
}

export default JobPostsMainPage;
