import { combineReducers } from 'redux';
import files from './files';
import user from './user';
import app from './app';

const rootReducer = combineReducers({
    app,
    files,
    user
});

export default rootReducer;