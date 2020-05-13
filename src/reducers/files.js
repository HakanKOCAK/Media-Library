import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    DELETE_TAG,
    SAVE_TAG
} from '../actions/types';

const initialState = {
    entities: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FILES_SUCCESS:
            return {
                ...state,
                entities: payload,
            }
        case GET_FILES_FAIL:
            return {
                ...state,
                error: payload
            }

        case DELETE_TAG:
            {
                const { submissionId, tagId } = payload
                let entities = { ...state.entities }
                delete entities[submissionId].entity.tags[tagId]
                return {
                    entities
                }
            }
        case SAVE_TAG:
            {
                const { submissionId, data } = payload
                const { tagId, tag } = data
                let entities = { ...state.entities }
                entities[submissionId].entity.tags[tagId] = tag
                return {
                    entities
                }
            }
        default:
            return state;
    }
}