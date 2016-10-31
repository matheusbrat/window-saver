import {combineReducers} from 'redux';
import todos from './todos';
import windows from './windows';


export default combineReducers({
    todos,
    windows
});
