import {
    FETCH_RECRUITER_DATA_REQUEST,
    FETCH_RECRUITER_DATA_SUCCESS,
    FETCH_RECRUITER_DATA_FAILURE,
  } from '../actions/recruiterActions';
  
  const initialState = {
    data: null,
    status: 'idle',
    error: null,
  };
  
  const recruiterReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RECRUITER_DATA_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_RECRUITER_DATA_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          data: action.payload,
        };
      case FETCH_RECRUITER_DATA_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default recruiterReducer;
  