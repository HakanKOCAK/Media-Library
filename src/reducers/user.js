import { SET_USER_DATA, REMOVE_USER_DATA } from '../actions/types';

const initialState = {
  email: '',
  displayName: '',
  isAuthenticated: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...initialState,
        email: action.payload.email,
        displayName: action.payload.displayName,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...initialState,
        email: '',
        displayName: '',
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default user;
