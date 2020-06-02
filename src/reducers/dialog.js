import { SET_DIALOG, HIDE_DIALOG } from '../actions/types';

const initState = {
  type: '',
  data: {},
  isOpen: false,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DIALOG:
      return {
        type: payload.type,
        isOpen: true,
        data: payload.data,
      };
    case HIDE_DIALOG:
      return {
        type: '',
        data: {},
        isOpen: false,
      };
    default:
      return state;
  }
}
