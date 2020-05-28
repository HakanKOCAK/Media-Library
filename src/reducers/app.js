import {
  USER_STATUS,
  FILES_STATUS,
} from '../actions/types';

const initialState = {
  userLoaded: false,
  filesLoaded: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_STATUS:
      return {
        ...state,
        userLoaded: payload.userLoaded,
      };
    case FILES_STATUS:
      return {
        ...state,
        filesLoaded: payload.filesLoaded,
      };
    default:
      return state;
  }
}
