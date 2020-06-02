import authService from '../services/auth.service';
import { setUserData } from './user';

export default function submitLogin(email, password, reLogin) {
  return (dispatch) => authService.signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (!reLogin) {
        dispatch(setUserData(user.email, user.displayName));
      }
      return { success: true, error: null };
    })
    .catch((error) => ({ success: false, error }));
}
