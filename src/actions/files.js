import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    DELETE_TAG,
    SAVE_TAG
} from './types';
import { setFilesLoaded } from './app';
import { getFiles } from '../apis/getFiles';

export const getAllFiles = () => {
    return async (dispatch) => {
        try {
            const answers = await getFiles();

            dispatch({
                type: GET_FILES_SUCCESS,
                payload: answers
            })
            dispatch(setFilesLoaded(true));
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_FILES_FAIL
            })
            dispatch(setFilesLoaded(true));
        }
    }
}

export const deleteTag = ({ submissionId, tagId }) => {
    return {
        type: DELETE_TAG,
        payload: { submissionId, tagId }
    }
}

export const saveTag = ({ submissionId, data }) => {
    return {
        type: SAVE_TAG,
        payload: { submissionId, data }
    }
}