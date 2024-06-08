import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';

import {db, auth} from '../../config/firebase'

// Async thunk to fetch recruiter data
export const fetchRecruiterData = createAsyncThunk(
  'recruiter/fetchRecruiterData',
  async (userId) => {
    const querySnapshot = await getDocs(collection(db, 'EmployersProfile'));
    let recruiterData = null;
    querySnapshot.forEach((doc) => {
      if (doc.id === userId) {
        recruiterData = doc.data();
      }
    });
    return recruiterData;
  }
);

const recruiterSlice = createSlice({
  name: 'recruiter',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecruiterData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRecruiterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recruiterSlice.extraReducers;
