import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    DELETE_TAG_REQUEST,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_ERROR,
    SAVE_TAG_REQUEST,
    ADD_TAG,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_ERROR,
    SAVE_TAG_ERROR,
    SAVE_TAG_SUCCESS,
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
                entities: []
            }
        case DELETE_FILE_REQUEST:
            {
                const { submissionId } = payload
                let entities = { ...state.entities }
                const obj = {}
                Object.entries(entities).forEach(([key, value]) => {
                    if (key !== submissionId) {
                        obj[key] = value
                    }
                })
                entities = obj
                return {
                    entities
                }
            }
        case SAVE_TAG_REQUEST:
            {
                const { submissionId, tagId } = payload
                let entities = { ...state.entities }
                const isNew = entities[submissionId].entity.tags[tagId].new
                if (isNew) {
                    const obj = {}
                    console.log(obj)
                    Object.entries(entities[submissionId].entity.tags[tagId]).forEach(([key, value]) => {
                        console.log(key, value)
                        if (key !== 'new') {
                            obj[key] = value
                        }
                    })
                    entities[submissionId].entity.tags[tagId] = obj
                    return {
                        entities
                    }
                }
                return {
                    entities
                }
            }
        case SAVE_TAG_ERROR:
        case SAVE_TAG_SUCCESS:
        case DELETE_FILE_SUCCESS:
        case DELETE_FILE_ERROR:
        case DELETE_TAG_SUCCESS:
        case DELETE_TAG_ERROR:
            return {
                ...state
            }
        case DELETE_TAG_REQUEST:
            {
                const { submissionId, tagId } = payload
                let entities = { ...state.entities }
                const obj = {}
                Object.entries(entities[submissionId].entity.tags).forEach(([key, value]) => {
                    if (key !== tagId) {
                        obj[key] = value
                    }
                })
                entities[submissionId].entity.tags = obj
                return {
                    entities
                }
            }
        case ADD_TAG:
            {
                const { submissionId, data } = payload
                const { tagId, tag } = data
                let entities = { ...state.entities }
                entities[submissionId].entity.tags[tagId] = tag
                entities[submissionId].entity.tags[tagId].new = true
                return {
                    entities
                }
            }
        default:
            return state;
    }
}