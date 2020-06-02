import authService from '../services/auth.service';
import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_SUCCESS,
} from './types';
import { setUserLoaded, setFilesLoaded } from './app';
import { getAllFiles, removeFiles } from './files';
import { setDialog } from './dialog';

export const removeUserData = () => (dispatch) => {
  dispatch({
    type: REMOVE_USER_DATA,
    payload: false,
  });
  dispatch(setUserLoaded(true));
  dispatch(setFilesLoaded(true));
};

export const setUserData = (email, displayName) => (dispatch) => {
  dispatch({
    type: SET_USER_DATA,
    payload: { email, displayName, isAuthenticated: true },
  });
  dispatch(setUserLoaded(true));
  dispatch(getAllFiles(0, 10));
};

export const logoutUser = () => (dispatch) => {
  authService.signOut();
  dispatch(removeFiles());
  dispatch(removeUserData());
};

export const updatePassword = (password) => (dispatch) => (
  authService.updatePassword(password)
    .then(() => {
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
      });
      dispatch(logoutUser());
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_PASSWORD_ERROR,
      });
      const errors = [];
      errors.push(error.message);
      dispatch(setDialog('error', { errors }));
    })
);

export const loadUser = () => (dispatch) => {
  authService.onAuthStateChanged((authUser) => {
    if (!authUser) {
      dispatch(removeUserData());
    } else {
      dispatch(setUserData(authUser.email, authUser.displayName));
    }
  });
};
