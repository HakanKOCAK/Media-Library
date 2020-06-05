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
  REMOVE_FILES,
} from './types';
import { setFilesLoaded } from './app';
import getFiles from '../apis/getFiles';
import deleteSubmittedFile from '../apis/deleteFile';
import { setDialog } from './dialog';
import updateTag from '../apis/updateTag';

export function getAllFiles(offset, limit) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_FILES_REQUEST,
      });

      const response = await getFiles(offset, limit);

      if (response.success && !response.noMore) {
        dispatch({
          type: GET_FILES_SUCCESS,
          payload: response.data,
        });
      } else if (response.successs) {
        dispatch({
          type: GET_FILES_FAIL,
        });
        dispatch(setDialog('error', { errors: response.errors }));
      }
      dispatch(setFilesLoaded(true));
      return { success: true, noMore: response.noMore };
    } catch (error) {
      dispatch({
        type: GET_FILES_FAIL,
      });
      const errors = [];
      errors.push(error);
      dispatch(('error', { errors }));
      dispatch(setFilesLoaded(true));
    }
  };
}

export const removeFiles = () => ({ type: REMOVE_FILES });

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
      dispatch(setDialog('error', { errors: response.errors }));
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
      dispatch(setDialog('error', { errors: response.errors }));
    } else {
      dispatch({
        type: DELETE_TAG_SUCCESS,
      });
    }
  };
}

export function addDuration({ submissionId, duration, prettifiedDuration }) {
  return {
    type: ADD_DURATION,
    payload: { submissionId, duration, prettifiedDuration },
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
        payload: { submissionId, size, prettifiedSize: pretty(size, false, false, 2) },
      });
    } catch (error) {
      dispatch({
        type: ADD_SIZE,
        payload: { submissionId, size: 'N/A' },
      });
    }
  };
}
