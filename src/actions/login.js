import authService from '../services/auth.service';
import { setUserData } from './user';

export default function submitLogin(email, password) {
  return (dispatch) => authService.signInWithEmailAndPassword(email, password)
    .then((token) => {
      dispatch(setUserData(email, token));
      return { success: true, error: null };
    })
    .catch((error) => ({ success: false, error }));
}
