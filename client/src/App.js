import React, { useEffect } from "react";
// import "./App.css";
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from "./components/Home"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
export default function App() {
  return (
    
    <BrowserRouter>
    <Routes>
    

      <Route exact path="/" element={
        <>
        <Navbar />
        <Home />
        </>
      } />
      {/* <Route path="/users/:applicantId" element={
          <Applicant />
        } />
        <Route path="/recruiter/:recruiterId" element={
          <Recruiter />
        } /> */}
        <Route path="/signup" element={
        <Signup />
      } />
      <Route path="/login" element={
        <Login />
      } />
      <Route path="/profile" element={
        <Profile />
      } />
    </Routes>
      
    </BrowserRouter>
  )
}
