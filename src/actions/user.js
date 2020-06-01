import authService from '../services/auth.service';
import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from './types';
import { setUserLoaded, setFilesLoaded } from './app';
import { getAllFiles, removeFiles } from './files';
import { setNotification } from './notification';

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
  dispatch(getAllFiles());
};

export const updatePassword = (password) => (dispatch) => (
  authService.updatePassword(password)
    .then(() => {
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
      });
      return { success: true };
    })
    .catch((error) => ({ success: false, code: error.code, message: error.message }))
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

export const logoutUser = () => (dispatch) => {
  authService.signOut();
  dispatch(removeFiles());
  dispatch(removeUserData());
};
