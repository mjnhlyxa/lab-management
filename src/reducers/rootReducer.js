import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import testReducer from './testReducer';

export default combineReducers({
    router: routerReducer,
    test: testReducer,
});