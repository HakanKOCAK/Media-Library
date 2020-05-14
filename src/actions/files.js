import {
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
    DELETE_TAG_REQUEST,
    SAVE_TAG,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_ERROR,
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

        console.log(submissionId)
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
    return async (dispatch) => {
        dispatch({
            type: DELETE_TAG_REQUEST,
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