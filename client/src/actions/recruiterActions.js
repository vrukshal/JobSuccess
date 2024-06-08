// actions.js
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import {auth} from '../config/firebase';
export const FETCH_RECRUITER_DATA_REQUEST = 'FETCH_RECRUITER_DATA_REQUEST';
export const FETCH_RECRUITER_DATA_SUCCESS = 'FETCH_RECRUITER_DATA_SUCCESS';
export const FETCH_RECRUITER_DATA_FAILURE = 'FETCH_RECRUITER_DATA_FAILURE';

export const fetchRecruiterDataRequest = () => ({
  type: FETCH_RECRUITER_DATA_REQUEST,
});

export const fetchRecruiterDataSuccess = (data) => ({
  type: FETCH_RECRUITER_DATA_SUCCESS,
  payload: data,
});

export const fetchRecruiterDataFailure = (error) => ({
  type: FETCH_RECRUITER_DATA_FAILURE,
  payload: error,
});

export const fetchRecruiterData = (userId) => async (dispatch) => {
  dispatch(fetchRecruiterDataRequest());
  try {
    console.log("Inside actions ",userId);
    const docref = await getDoc(doc(db, "EmployerProfiles", userId));
    let recruiterData = null;
    recruiterData = docref.data();
    console.log(docref);
    
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id);
    //   if (doc.id === userId) {
    //     console.log("found employer", doc);
        
    //   }
    // });
    dispatch(fetchRecruiterDataSuccess(recruiterData));
  } catch (error) {
    dispatch(fetchRecruiterDataFailure(error.message));
  }
};
