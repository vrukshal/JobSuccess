// import { useState } from 'react';
import React, { useEffect } from 'react';
import './css/Signup.css';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { browserPopupRedirectResolver } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../actions/authActions';


function Signup() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [userType, setUserType] = React.useState("");
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      const checkAuth = () => {
        if (user) {
          navigate('/profile');
        }
      };
  
      checkAuth();
    }, [user]);
    const handleSubmit = async (e) => {
        console.log("Creating user profile...")
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const data = await response.json();
            console.log('User data:', data);
            dispatch(setUser(data));
            onAuthStateChanged(auth, async (userAuth) => {
              if (userAuth) {
                console.log("auth changed in signup");
        }});
          } catch (error) {
            console.error('Error logging in:', error);
          }
    }

    const signInwithGoogle = async (e) => {
        console.log("Signing in with Google...")
        e.preventDefault();
        
        try {

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
            const user = result.user;
            const idtoken = await user.getIdToken();
            console.log(idtoken);
            const response = await fetch('http://localhost:3001/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idtoken }),
            });
            const data = await response.json();
            console.log('User data:', data.name);
            dispatch(setUser(data));
          } catch (error) {
            console.error('Error logging in:', error);
          }
    }
  return (
    <div className="signup-main-content">
      <div className="image-section">
        <img src="https://images.unsplash.com/photo-1494809610410-160faaed4de0?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Job seekers" className="side-image" />
      </div>
      <div className="text-section">
        <h1>Let's find your next job</h1>
        <p>Join JobSuccess’s community of job seekers, the best place for students, early career professionals, and career changers to find jobs and internships.</p>
        <button type="button" class="google-sign-in-button" onClick={signInwithGoogle}>
            Sign in with Google
        </button>
        <h3> OR </h3>
        <form className="email-form">
            <label htmlFor="firstname">First Name</label>
          <input type="firstname" id="firstname" name="firstname" onChange={(e) => setFirstName(e.target.value)} required />
          <label htmlFor="lastname">Last Name</label>
          <input type="lastname" id="lastname" name="lastname" onChange={(e) => setLastName(e.target.value)} required />
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="continue-btn" onClick={handleSubmit}>Continue</button>
        </form>
        <p>Already a member?{" "}
            <a href='/login'>Log in</a>
        </p>
        
      </div>
    </div>
  );
}

export default Signup;
