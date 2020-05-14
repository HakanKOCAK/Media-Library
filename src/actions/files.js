import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    DELETE_TAG,
    SAVE_TAG,
    DELETE_FILE
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

export const deleteFile = (submissiodId) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_FILE,
            payload: { submissionId: submissiodId }
        })

        const response = await deleteSubmittedFile(submissiodId);
        if (!response.success) {
            console.log('here')
            dispatch(setError(response.error))
        }
    }
}

export const deleteTag = ({ submissionId, tagId }) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_TAG,
            payload: { submissionId, tagId }
        })
    }
}

export const saveTag = ({ submissionId, data }) => {
    return {
        type: SAVE_TAG,
        payload: { submissionId, data }
    }
}