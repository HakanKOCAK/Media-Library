import { SET_USER_DATA, USER_LOGGED_OUT } from './types';

const initialState = {
    isAuthenticated: false
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            {
                return {
                    ...initialState,
                    isAuthenticated: action.payload
                };
            }
        case Actions.USER_LOGGED_OUT:
            {
                return {
                    ...initialState,
                    isAuthenticated: action.payload
                };
            }
        default:
            {
                return state
            }
    }
};

export default user;
