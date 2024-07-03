import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from './app/store'; // Import the Redux store

import Home from './components/Home';
// import Messaging from './components/Messaging';
import Login from './components/Login';
import Profile from './components/Profile';
import StudentMainPage from './components/StudentMainPage';
import RecruiterMainPage from './components/RecruiterMainPage';
import MainApp from './components/ProfilePage/MainApp';
import Signup from './components/Signup';
import NotFound from './components/PageNotFound';
import RecruiterFiles from './components/RecruiterFilesPage/RecruiterFiles';
import JobPostsMainPage from './components/JobPostsPage/JobPostsMainPage';
import NewJobPost from './components/JobPostsPage/NewJobPost';
import StudentProfilePage from './components/StudentProfilePage/StudentProfilePage';
import StudentJobsPage from './components/StudentJobsPage.js/StudentJobsPage';
import StudentHomePage from './components/StudentHomePage/StudentHomePage';
import JobApplicantsPage from './components/JobApplicantsPage/JobApplicantsPage';
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stu" element={<StudentHomePage />} />
          <Route path="/stu/jobs" element={<StudentJobsPage />} />
          <Route path="/stu/profile" element={<StudentProfilePage />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route path="/stu" element={<StudentMainPage />} /> */}
          <Route path="/rec" element={<RecruiterMainPage />} />
          <Route path="/rec/:userId" element={<MainApp />} />
          <Route path="/rec/files" element={<RecruiterFiles />} />
          <Route path="/rec/postings" element={<JobPostsMainPage /> } />
          <Route path="/rec/postings/newjobpost" element={<NewJobPost /> } />
          <Route path="/rec/postings/:jobId" element={<JobApplicantsPage /> } />
          {/* <Route path="/messaging" element={<Messaging />} />
          <Route path="/messaging/:receiverId" element={<Messaging />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
