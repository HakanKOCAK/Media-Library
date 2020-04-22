import authService from '../services/auth.service';
import { setUserData } from './user';

export function submitRegister(email, password) {
    return (dispatch) =>
        authService.createUserWithEmailAndPassword(email, password)
            .then((token) => {
                dispatch(setUserData(token));
                return { success: true, error: null };
            })
            .catch(error => {
                return { success: false, error: error };
            });
}