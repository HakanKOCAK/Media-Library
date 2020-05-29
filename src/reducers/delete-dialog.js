import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/types';

const initState = {
  isOpen: false,
  data: null,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_DIALOG:
      return {
        isOpen: true,
        data: payload.data,
      };
    case CLOSE_DIALOG:
      return {
        isOpen: false,
        data: null,
      };
    default:
      return state;
  }
}
