import {
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from '../actions/types';

const initialState = {
    success: false,
    error: null
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...initialState,
                success: true
            };
        case LOGIN_ERROR:
            return {
                success: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default login;