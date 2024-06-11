import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { listenForAuthChange } from '../actions/authActions';
import StudentMainPage from './StudentMainPage';
import Navbar from './Navbar';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [profileComplete, setProfileComplete] = useState('');

  useEffect(() => {
    dispatch(listenForAuthChange());
  }, [dispatch]);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!loading) {
        if (user) {
          try {
            const res = await userProfileIsCompleted(user);
            setProfileComplete(res);
            if (res) {
              console.log(res);
              if (res === "applicant") {
                console.log("profile COMPLETED");
                navigate('/stu');
              } else if (res === "recruiter") {
                navigate('/rec');
              } else {
                navigate('/profile');
              }
            }
          } catch (error) {
            console.error("Error checking user profile completion:", error);
            // Handle error if needed
          }
        } else {
          navigate('/login');
        }
      }
    };

    checkUserProfile();
  }, [user, loading, navigate]);

  async function userProfileIsCompleted(userData) {
    const uid = userData.uid;
    const checkApplicant = doc(db, "StudentProfiles", uid);
    const checkRecruiter = doc(db, "EmployerProfiles", uid);
    const applicantSnap = await getDoc(checkApplicant);
    const recruiterSnap = await getDoc(checkRecruiter);
    if(applicantSnap.exists()){
      return "applicant";
    }
    if(recruiterSnap.exists()){
      return "recruiter";
    }
    return false;
  }

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className='home'>
      {user ? <Navbar /> : <div> <StudentMainPage/> </div>}
    </div>
  );
}

export default Home;
