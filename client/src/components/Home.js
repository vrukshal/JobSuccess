import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import Signup from '../components/Signup';
import Profile from '../components/Profile';
import MainPage from '../components/MainPage';

function Home() {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        const isComplete = await userProfileIsCompleted(userAuth);
        setProfileComplete(isComplete);
      } else {
        setUser(null);
        setProfileComplete(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      <Navbar />
      {!user ? <Signup /> : (profileComplete ? <MainPage /> : <Profile />)}
    </div>
  );
}

export default Home;
