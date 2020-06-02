import { combineReducers } from 'redux';
import files from './files';
import user from './user';
import app from './app';
import dialog from './dialog';

const rootReducer = combineReducers({
  app,
  files,
  user,
  dialog,
});

export default rootReducer;
