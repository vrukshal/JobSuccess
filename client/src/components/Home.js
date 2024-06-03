import React from 'react'
// import {useEffect} from 'react';
// import ReactDOM from "react-dom";
// import {useDispatch, useSelector} from "react-redux";
// import { login, logout, selectUser } from "../features/userSlice";
// import { auth } from "../../../server/config/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

import JobList from './JobsList';
import JobsNavbar from './JobsNavBar';
import JobsSidebar from './JobsSideBar';
import "./css/Home.css"
function Home() {

    // const user = useSelector(selectUser)
    // const dispatch = useDispatch();
    // // const auth = getAuth();
    // useEffect(() => {
    //   onAuthStateChanged(auth, (userAuth) => {
    //     if(userAuth){
    //       dispatch(
    //         login({
    //           email: userAuth.email,
    //           uid: userAuth.uid,
    //           displayName: userAuth.displayName,
    //           firstName: userAuth.firstName,
    //           lastName: userAuth.lastName,
    //         })
    //       )
    //     }
    //     else{
    //       dispatch(logout());
    //     }
    //   })
    // }, []);
    const [selectedTab, setSelectedTab] = React.useState('jobs');
    const [selectedType, setSelectedType] = React.useState('full-time');
  
    return (
      <div className="home">
      
        <JobsNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="content">
          <JobsSidebar selectedType={selectedType} setSelectedType={setSelectedType} />
          <main className="main-feed">
            {selectedTab === 'jobs' ? (
              <JobList jobType={selectedType} />
            ) : (
              <div>Saved Jobs</div>
            )}
          </main>
        </div>
      </div>
    );
  
}

export default Home;
