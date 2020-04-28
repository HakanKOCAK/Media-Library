import { SET_USER_DATA, REMOVE_USER_DATA, USER_LOGGED_OUT } from '../actions/types';

const initialState = {
    email: '',
    isAuthenticated: false,
    loading: true,
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            {
                return {
                    ...initialState,
                    email: action.payload.email,
                    loading: false,
                    isAuthenticated: action.payload.isAuthenticated
                };
            }
        case REMOVE_USER_DATA:
        case USER_LOGGED_OUT:
            {
                return {
                    ...initialState,
                    email: '',
                    loading: false,
                    isAuthenticated: false
                };
            }
        default:
            {
                return state
            }
    }
};

export default user;
