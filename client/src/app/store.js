import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import recruiterReducer from '../reducers/recruiterReducer';
// const rootReducer = combineReducers({
//   authReducer
// });

const store = configureStore({
    reducer: {
      auth: authReducer,
      recruiter: recruiterReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
})

export default store;
