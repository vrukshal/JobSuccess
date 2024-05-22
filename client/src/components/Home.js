import React from 'react'
import {useEffect} from 'react';
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
// import { auth } from "../../../server/config/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from './Navbar';
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

  return (
    <div className="home">
      <Navbar />
    </div>
  )
}

export default Home;
