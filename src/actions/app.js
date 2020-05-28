import { USER_STATUS, FILES_STATUS } from './types';

export function setUserLoaded(status) {
  return {
    type: USER_STATUS,
    payload: { userLoaded: status },
  };
}

export function setFilesLoaded(status) {
  return {
    type: FILES_STATUS,
    payload: { filesLoaded: status },
  };
}
