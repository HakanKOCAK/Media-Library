import pretty from 'prettysize';
import axios from 'axios';
import {
  GET_FILES_REQUEST,
  GET_FILES_SUCCESS,
  GET_FILES_FAIL,
  DELETE_TAG_REQUEST,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
  ADD_DURATION,
  ADD_SIZE,
  DELETE_TAG_ERROR,
  DELETE_TAG_SUCCESS,
} from './types';
import { setFilesLoaded } from './app';
import getFiles from '../apis/getFiles';
import deleteSubmittedFile from '../apis/deleteFile';
import { setError } from './error';
import updateTag from '../apis/updateTag';

export function getAllFiles() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_FILES_REQUEST,
      });

      const response = await getFiles();

      if (response.success) {
        dispatch({
          type: GET_FILES_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GET_FILES_FAIL,
        });
        dispatch(setError(response.error));
      }
      dispatch(setFilesLoaded(true));
    } catch (error) {
      dispatch({
        type: GET_FILES_FAIL,
      });
      dispatch(setError(error));
      dispatch(setFilesLoaded(true));
    }
  };
}

export function deleteFile(submissionId) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_FILE_REQUEST,
      payload: { submissionId },
    });

    const response = await deleteSubmittedFile(submissionId);
    if (!response.success) {
      dispatch({
        type: DELETE_FILE_ERROR,
      });
      dispatch(setError(response.error));
    } else {
      dispatch({
        type: DELETE_FILE_SUCCESS,
      });
    }
  };
}

export function deleteTag({ submissionId, tagId }) {
  return async (dispatch, getState) => {
    dispatch({
      type: DELETE_TAG_REQUEST,
      payload: { submissionId, tagId },
    });
    const { qid, tags } = getState().files.entities[submissionId].entity;
    const response = await updateTag({ submissionId, qid, data: tags });
    if (!response.success) {
      dispatch({
        type: DELETE_TAG_ERROR,
      });
      dispatch(setError(response.error));
    } else {
      dispatch({
        type: DELETE_TAG_SUCCESS,
      });
    }
  };
}

export function addDuration({ submissionId, duration }) {
  return {
    type: ADD_DURATION,
    payload: { submissionId, duration },
  };
}

export function addSize(submissionId, url) {
  return async (dispatch) => {
    try {
      const resp = await axios({
        method: 'get',
        url,
        responseType: 'blob',
      });

      const { size } = resp.data;
      dispatch({
        type: ADD_SIZE,
        payload: { submissionId, size: pretty(size, false, false, 2) },
      });
    } catch (error) {
      dispatch({
        type: ADD_SIZE,
        payload: { submissionId, size: 'N/A' },
      });
    }
  };
}
