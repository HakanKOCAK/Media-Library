import { SET_DIALOG, HIDE_DIALOG } from './types';

export function setDialog(type, data) {
  return {
    type: SET_DIALOG,
    payload: { type, data },
  };
}

export function hideDialog() {
  return {
    type: HIDE_DIALOG,
  };
}
