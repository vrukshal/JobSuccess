import React, { useEffect } from "react";
// import "./App.css";
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Home from "./components/Home"
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={
        <Home />
      } />
      {/* <Route path="/users/:applicantId" element={
          <Applicant />
        } />
        <Route path="/recruiter/:recruiterId" element={
          <Recruiter />
        } /> */}
        {/* <Route path="/contact" component={Contact} /> */}
    </Routes>
      
    </BrowserRouter>
  )
}
