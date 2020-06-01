import { SET_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/types';

const initState = {
  type: '',
  data: {},
  isOpen: false,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_NOTIFICATION:
      return {
        type: payload.type,
        isOpen: true,
        data: payload.data,
      };
    case HIDE_NOTIFICATION:
      return {
        type: '',
        data: {},
        isOpen: false,
      };
    default:
      return state;
  }
}
