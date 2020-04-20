import authService from '../services/auth.service';
import { LOGIN_ERROR, LOGIN_SUCCESS } from './types';
import { setUserData } from './user';

export function submitLogin(email, password) {
    return (dispatch) =>
        authService.signInWithEmailAndPassword(email, password)
            .then((token) => {
                dispatch(setUserData(token));
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            });
}