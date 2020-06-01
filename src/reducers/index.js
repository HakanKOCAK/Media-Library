import { combineReducers } from 'redux';
import files from './files';
import user from './user';
import app from './app';
import notification from './notification';

const rootReducer = combineReducers({
  app,
  files,
  user,
  notification,
});

export default rootReducer;
