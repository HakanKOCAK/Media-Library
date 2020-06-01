import authService from '../services/auth.service';
import { setUserData } from './user';

export default function submitRegister(firstName, secondName, surname, email, password) {
  const displayName = `${firstName}${secondName ? ` ${secondName}` : ''} ${surname}`;
  return (dispatch) => authService.createUserWithEmailAndPassword(
    displayName,
    email,
    password,
  ).then(() => {
    dispatch(setUserData(email, displayName));
    return { success: true, error: null };
  }).catch((error) => ({ success: false, error }));
}
