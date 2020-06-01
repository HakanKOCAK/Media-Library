import { SET_NOTIFICATION, HIDE_NOTIFICATION } from './types';

export function setNotification(type, data) {
  return {
    type: SET_NOTIFICATION,
    payload: { type, data },
  };
}

export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION,
  };
}
