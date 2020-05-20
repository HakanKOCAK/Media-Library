import { SET_ERROR, HIDE_ERROR } from '../actions/types';

const initState = {
    message: null,
    isOpen: false,
    errorTypes: []
};

export default function (state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ERROR:
            if (payload.types) {
                return {
                    message: payload.error,
                    isOpen: true,
                    errorTypes: payload.types
                }
            }
            return {
                message: payload.error,
                isOpen: true,
                errorTypes: []
            }
        case HIDE_ERROR:
            return {
                message: null,
                isOpen: false,
                errorTypes: []
            }
        default:
            return state;
    }
}