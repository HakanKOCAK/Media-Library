import authService from '../services/auth.service';
import { SET_USER_DATA, REMOVE_USER_DATA, USER_LOGGED_OUT } from './types';

export function setUserData(token) {
    return (dispatch) => {

        const token = localStorage.getItem('medialibrary.user.token');

        if (!token) {
            localStorage.setItem('medialibrary.user.token', token);
            // Set 24 min expire time.
            localStorage.setItem('medialibrary.user.token.expiresAt', Date.now() + 60 * 1000 * 24);
        }
        dispatch({
            type: SET_USER_DATA,
            payload: true
        })
    }
}

export function removeUserData() {
    return (dispatch) => {
        localStorage.removeItem('medialibrary.user.token');
        localStorage.removeItem('medialibrary.user.token.expiresAt');
        dispatch({
            type: REMOVE_USER_DATA,
            payload: false
        })
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