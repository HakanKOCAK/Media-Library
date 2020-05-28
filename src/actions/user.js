import authService from '../services/auth.service';
import { SET_USER_DATA, REMOVE_USER_DATA } from './types';
import { setUserLoaded, setFilesLoaded } from './app';
import { getAllFiles } from './files';

export const removeUserData = () => (dispatch) => {
  localStorage.removeItem('medialibrary.user.token');
  localStorage.removeItem('medialibrary.user.token.expiresAt');
  dispatch({
    type: REMOVE_USER_DATA,
    payload: false,
  });
  dispatch(setUserLoaded(true));
  dispatch(setFilesLoaded(true));
};

export const setUserData = (email, token) => (dispatch) => {
  const localToken = localStorage.getItem('medialibrary.user.token');
  if (!localToken) {
    localStorage.setItem('medialibrary.user.token', token);
    // Set 24 min expire time.
    localStorage.setItem('medialibrary.user.token.expiresAt', Date.now() + 60 * 1000 * 24);
  }

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

    const isLoggedIn = localStorage.getItem('medialibrary.user.token');
    const isExpired = Date.now() > localStorage.getItem('medialibrary.user.token.expiresAt');

    if (isLoggedIn && !isExpired) {
      dispatch(setUserData(authUser.email));
    } else {
      dispatch(removeUserData());
    }
  });
};

export const logoutUser = () => (dispatch) => {
  authService.signOut();
  dispatch(removeUserData());
};
