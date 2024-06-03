import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { listenForAuthChange } from '../actions/authActions';
import MainPage from './MainPage';
import Navbar from './Navbar';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    dispatch(listenForAuthChange());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if(userProfileIsCompleted(user)){
          setProfileComplete(true);
          if (profileComplete) {
            navigate('/mainpage');
          } else {
            navigate('/profile');
          }
        };
      } else {
        navigate('/login');
      }
    }
  }, [user, loading, navigate]);

  async function userProfileIsCompleted(userData) {
    const uid = userData.uid;
    const checkApplicant = doc(db, "StudentProfiles", uid);
    const checkRecruiter = doc(db, "EmployerProfiles", uid);
    const applicantSnap = await getDoc(checkApplicant);
    const recruiterSnap = await getDoc(checkRecruiter);
    return applicantSnap.exists() || recruiterSnap.exists();
  }

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className='home'>
      {user ? <Navbar /> : <div> <MainPage/> </div>}
    </div>
  );
}

export default Home;
