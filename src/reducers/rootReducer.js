import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import testReducer from './testReducer';
import sidebarReducer from './sidebarReducer';
import loginReducer from 'reducers/loginReducer';
import usersReducer from 'reducers/usersReduer';
import tableReducer from 'reducers/tableReducer';

const appReducers = combineReducers({
    router: routerReducer,
    users: usersReducer,
    test: testReducer,
    sidebar: sidebarReducer,
    login: loginReducer,
    table: tableReducer,
});

export default (state, action) => {
    return appReducers(state, action);
};
