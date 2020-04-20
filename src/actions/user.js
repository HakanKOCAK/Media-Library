import authService from '../services/auth.service';
import { SET_USER_DATA, REMOVE_USER_DATA, USER_LOGGED_OUT } from './types';

export function setUserData(token) {
    return (dispatch) => {

        localStorage.setItem('medialibrary.user.token', token);
        localStorage.setItem('medialibrary.user.token.expiresAt', Date.now() + 3600000);
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