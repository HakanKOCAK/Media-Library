import { combineReducers } from 'redux';
import files from './files';
import user from './user';
import app from './app';
import error from './error';
import deleteDialog from './delete-dialog';

const rootReducer = combineReducers({
  app,
  files,
  user,
  error,
  deleteDialog,
});

export default rootReducer;
