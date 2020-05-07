import { SET_USER_DATA, REMOVE_USER_DATA } from '../actions/types';

const initialState = {
    email: '',
    isAuthenticated: false
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            {
                return {
                    ...initialState,
                    email: action.payload.email,
                    isAuthenticated: action.payload.isAuthenticated
                };
            }
        case REMOVE_USER_DATA:
            {
                return {
                    ...initialState,
                    email: '',
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
