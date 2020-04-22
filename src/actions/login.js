import authService from '../services/auth.service';
import { LOGIN_ERROR, LOGIN_SUCCESS } from './types';
import { setUserData } from './user';

export function submitLogin(email, password) {
    return (dispatch) =>
        authService.signInWithEmailAndPassword(email, password)
            .then((token) => {
                dispatch(setUserData(token));
                return { success: true, error: null };
            })
            .catch(error => {
                return { success: false, error: error };
            });
}