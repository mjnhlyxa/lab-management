import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import testReducer from './testReducer';
import sidebarReducer from './sidebarReducer';
import loginReducer from 'reducers/loginReducer';

const appReducers = combineReducers({
    router: routerReducer,
    test: testReducer,
    sidebar: sidebarReducer,
    login: loginReducer,
});

export default (state, action) => {
    return appReducers(state, action);
};
