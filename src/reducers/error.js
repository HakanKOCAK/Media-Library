import { SET_ERROR, HIDE_ERROR } from '../actions/types';

const initState = {
    message: null,
    isOpen: false
};

export default function (state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ERROR:
            return {
                message: payload,
                isOpen: true
            }
        case HIDE_ERROR:
            return {
                message: null,
                isOpen: false
            }
        default:
            return state;
    }
}