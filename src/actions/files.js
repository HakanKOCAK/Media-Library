import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    DELETE_TAG_REQUEST,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_ERROR,
    ADD_DURATION
} from './types';
import { setFilesLoaded } from './app';
import { getFiles } from '../apis/getFiles';
import { deleteSubmittedFile } from '../apis/deleteFile';
import { setError } from './error';

export const getAllFiles = () => {
    return async (dispatch) => {
        try {
            const response = await getFiles();

            if (response.success) {
                dispatch({
                    type: GET_FILES_SUCCESS,
                    payload: response.data
                })
            } else {
                dispatch({
                    type: GET_FILES_FAIL
                })
                dispatch(setError(response.error))
            }
            dispatch(setFilesLoaded(true));
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_FILES_FAIL
            })
            dispatch(setError(error))
            dispatch(setFilesLoaded(true));
        }
    }
}

export const deleteFile = (submissionId) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_FILE_REQUEST,
            payload: { submissionId: submissionId }
        })

        const response = await deleteSubmittedFile(submissionId);
        if (!response.success) {
            dispatch({
                type: DELETE_FILE_ERROR
            })
            dispatch(setError(response.error))
        } else {
            dispatch({
                type: DELETE_FILE_SUCCESS
            })
        }
    }
}

export const deleteTag = ({ submissionId, tagId }) => {
    return {
        type: DELETE_TAG_REQUEST,
        payload: { submissionId, tagId }
    }
}

export const addDuration = ({ submissionId, duration }) => {
    return {
        type: ADD_DURATION,
        payload: { submissionId, duration }
    }
}
