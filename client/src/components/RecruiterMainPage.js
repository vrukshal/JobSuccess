import React, { useEffect } from 'react';
import RecruiterSidebar from './RecruiterSidebar';
import RecruiterNavbar from './RecruiterNavbar';
import RecruiterMainContent from './RecruiterMainContent';
import './css/RecruiterMainPage.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function RecruiterMainPage() {
  const navigate = useNavigate();
  const cookierec = Cookies.get('recruiter');
  // console.log("found a cookie", cookierec);
  useEffect(() => {
    if(!cookierec){
      navigate('/login');
    }
  }, []);
  console.log(cookierec);
  return cookierec && (
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
