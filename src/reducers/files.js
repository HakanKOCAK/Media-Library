import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL
} from '../actions/types';

const initialState = {
    loading: true,
    entities: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FILES_SUCCESS:
            return {
                ...state,
                loading: false,
                entities: payload,
            }
        case GET_FILES_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}