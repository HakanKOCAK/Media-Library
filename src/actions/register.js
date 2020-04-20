import authService from '../services/auth.service';
import { setUserData } from './user';
import { REGISTER_ERROR, REGISTER_SUCCESS } from './types';

export function submitRegister(email, password) {
    return (dispatch) =>
        authService.createUserWithEmailAndPassword(email, password)
            .then((token) => {
                dispatch(setUserData(token));
                return dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch(error => {
                return dispatch({
                    type: REGISTER_ERROR,
                    payload: error
                });
            });
}