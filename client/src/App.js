import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from './app/store'; // Import the Redux store

import Home from './components/Home';
// import Messaging from './components/Messaging';
import Login from './components/Login';
import Profile from './components/Profile';
import MainPage from './components/MainPage';
import Signup from './components/Signup';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mainpage" element={<MainPage />} />
          {/* <Route path="/messaging" element={<Messaging />} />
          <Route path="/messaging/:receiverId" element={<Messaging />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
