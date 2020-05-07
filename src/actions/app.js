import { USER_STATUS, FILES_STATUS } from './types';

export const setUserLoaded = (status) => {
    return {
        type: USER_STATUS,
        payload: { userLoaded: status }
    }
}

export const setFilesLoaded = (status) => {
    return {
        type: FILES_STATUS,
        payload: { filesLoaded: status }
    }
}