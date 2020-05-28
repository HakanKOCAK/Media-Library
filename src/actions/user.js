import authService from '../services/auth.service';
import { SET_USER_DATA, REMOVE_USER_DATA } from './types';
import { setUserLoaded, setFilesLoaded } from './app';
import { getAllFiles } from './files';

export const removeUserData = () => (dispatch) => {
  dispatch({
    type: REMOVE_USER_DATA,
    payload: false,
  });
  dispatch(setUserLoaded(true));
  dispatch(setFilesLoaded(true));
};

export const setUserData = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_DATA,
    payload: { email, isAuthenticated: true },
  });
  dispatch(setUserLoaded(true));
  dispatch(getAllFiles());
};


export const loadUser = () => (dispatch) => {
  authService.onAuthStateChanged((authUser) => {
    if (!authUser) {
      dispatch(removeUserData());
    }
    dispatch(setUserData(authUser.email, authUser.getIdToken()));
  });
};

export const logoutUser = () => (dispatch) => {
  authService.signOut();
  dispatch(removeUserData());
};
