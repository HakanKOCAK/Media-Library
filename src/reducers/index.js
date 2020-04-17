import { combineReducers } from 'redux';
import files from './files';
import login from './login';
import register from './register';

const rootReducer = combineReducers({
    files,
    login,
    register
});

export default rootReducer;