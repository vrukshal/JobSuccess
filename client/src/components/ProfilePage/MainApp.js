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
import { useParams } from 'react-router-dom';

function MainApp() {
  const dispatch = useDispatch();
  const recruiter = useSelector((state) => state.recruiter.data);
  const recruiterStatus = useSelector((state) => state.recruiter.status);
  const recruiterError = useSelector((state) => state.recruiter.error);
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
  return (
    <div className="MainApp">
      {recruiter && (
          <>
          <ProfileHeader recruiter={recruiter} />
          <div className='mainapp-grid'>  
          <ProfileOverview recruiter={recruiter} />
          <ContactInformation recruiter={recruiter} />
          <JobsSection recruiter={recruiter} />
          <PublicStaffList recruiter={recruiter} />
          <StudentsSection recruiter={recruiter} />
          </div>
          </>
      )}
    </div>
  );
}

export default MainApp;
