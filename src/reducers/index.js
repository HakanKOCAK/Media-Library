import { combineReducers } from 'redux';
import files from './files';
import user from './user';
import app from './app';
import error from './error';

const rootReducer = combineReducers({
  app,
  files,
  user,
  error,
});

export default rootReducer;
