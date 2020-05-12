import { GET_FILES_SUCCESS, GET_FILES_FAIL } from './types';
import { setFilesLoaded } from './app';
import { getFiles } from '../apis/getFile';

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