import { OPEN_DIALOG, CLOSE_DIALOG } from './types';

export const openDialog = (data) => ({
  type: OPEN_DIALOG,
  payload: { data },
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});
