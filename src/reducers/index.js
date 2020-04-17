import { combineReducers } from 'redux';
import files from './files';
import login from './login';

const rootReducer = combineReducers({
    files,
    login
});

export default rootReducer;