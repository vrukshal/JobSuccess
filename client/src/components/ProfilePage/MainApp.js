import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecruiterData } from '../../actions/recruiterActions';
import ProfileHeader from './ProfileHeader';
import ProfileOverview from './ProfileOverview';
import ContactInformation from './ContactInformation';
import JobsSection from './JobsSection';
import PublicStaffList from './PublicStaffList';
import StudentsSection from './StudentsSection';
import "./MainApp.css";
// import "./MainAppUpdated.css";
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import RecruiterSidebar from '../RecruiterSidebar';
import RecruiterNavbar from '../RecruiterNavbar';
function MainApp() {
  const dispatch = useDispatch();
  const recruiter = useSelector((state) => state.recruiter.data);
  const recruiterStatus = useSelector((state) => state.recruiter.status);
  const recruiterError = useSelector((state) => state.recruiter.error);
  const recruiterCookie = JSON.parse(Cookies.get('recruiter'));
  console.log("Rec cookie:",recruiterCookie);
  const { userId } = useParams();
  console.log("User id : ",userId);
  useEffect(() => {
    dispatch(fetchRecruiterData(userId));
  }, [dispatch]);

  if (recruiterStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (recruiterStatus === 'failed') {
    return <div>Error: {recruiterError}</div>;
  }
  console.log(recruiter);
  return recruiterCookie && (
      <div className="recruiter-main-page">
        <RecruiterSidebar />
        <div className="main-section">
          <RecruiterNavbar />
          <div className="main-containter-to-fit-in-centre">
            <div className="profile-page-content">
              <ProfileHeader recruiter={recruiterCookie} />
              <ProfileOverview recruiter={recruiterCookie} />
              <ContactInformation recruiter={recruiterCookie} />
              <JobsSection recruiter={recruiterCookie} />
              <PublicStaffList recruiter={recruiterCookie} />
              <StudentsSection recruiter={recruiterCookie} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default MainApp;
