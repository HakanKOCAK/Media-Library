import { SET_ERROR, HIDE_ERROR } from './types';

export function setError(error) {
    return {
        type: SET_ERROR,
        payload: error
    }
}

export function hideError() {
    return {
        type: HIDE_ERROR
    }
}