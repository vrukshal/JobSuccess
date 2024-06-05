import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';

export const setUser = (user) => {
  if (user) {
    const { uid, email, displayName, photoURL } = user;
    return {
      type: 'SET_USER',
      payload: { uid, email, displayName, photoURL },
    };
  } else {
    return {
      type: 'SET_USER',
      payload: null,
    };
  }
};

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const listenForAuthChange = () => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, (userAuth) => {
    if (userAuth) {
      // console.log("AUTH CHANGeD authactions")
      dispatch(setUser(userAuth));
    } else {
      dispatch(setUser(null));
    }
    dispatch(setLoading(false));
  });
};
