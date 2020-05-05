import authService from '../services/auth.service';
import { SET_USER_DATA, REMOVE_USER_DATA, USER_LOGGED_OUT } from './types';

export const loadUser = () => (dispatch) => {
    authService.onAuthStateChanged(authUser => {
        if (!authUser) {
            dispatch(removeUserData());
        }

        const isLoggedIn = localStorage.getItem('medialibrary.user.token')
        const isExpired = Date.now() > localStorage.getItem('medialibrary.user.token.expiresAt')

        if (isLoggedIn && !isExpired) {
            dispatch(setUserData(authUser.email));
        } else {
            dispatch(removeUserData());
        }
    })
}

export function setUserData(email, token) {
    const localToken = localStorage.getItem('medialibrary.user.token');
    if (!localToken) {
        localStorage.setItem('medialibrary.user.token', token);
        // Set 24 min expire time.
        localStorage.setItem('medialibrary.user.token.expiresAt', Date.now() + 60 * 1000 * 24);
    }
    return {
        type: SET_USER_DATA,
        payload: { email: email, isAuthenticated: true }
    }
}

export function removeUserData() {
    localStorage.removeItem('medialibrary.user.token');
    localStorage.removeItem('medialibrary.user.token.expiresAt');
    return {
        type: REMOVE_USER_DATA,
        payload: false
    }
}

export function logoutUser() {
    return (dispatch) => {
        authService.signOut();
        dispatch(removeUserData());
        dispatch({
            type: USER_LOGGED_OUT,
            payload: false
        })
    }
}