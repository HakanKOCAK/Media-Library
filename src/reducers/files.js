import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL
} from '../actions/types';

const initialState = {
    files: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FILES_SUCCESS:
            return {
                ...state,
                files: payload,
            }
        case GET_FILES_FAIL:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}