import authService from '../services/auth.service';
import { REGISTER_ERROR, REGISTER_SUCCESS } from './types';

export function submitRegister(email, password) {
    return (dispatch) =>
        authService.createUserWithEmailAndPassword(email, password)
            .then((data) => {
                // dispatch(setUserData(data));

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