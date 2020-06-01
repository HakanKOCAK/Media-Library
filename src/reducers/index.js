import { combineReducers } from 'redux';
import files from './files';
import user from './user';
import app from './app';
import notification from './notification';
import deleteDialog from './delete-dialog';

const rootReducer = combineReducers({
  app,
  files,
  user,
  notification,
  deleteDialog,
});

export default rootReducer;
