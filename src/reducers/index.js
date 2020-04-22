import { combineReducers } from 'redux';
import files from './files';
import user from './user';

const rootReducer = combineReducers({
    files,
    user
});

export default rootReducer;