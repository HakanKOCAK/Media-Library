import authService from '../services/auth.service';
import { LOGIN_ERROR, LOGIN_SUCCESS } from './types';

export function submitLogin(email, password) {
    return (dispatch) =>
        authService.signInWithEmailAndPassword(email, password)
            .then((data) => {
                // dispatch(setUserData(data));

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