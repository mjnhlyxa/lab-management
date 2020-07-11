import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const testAction = createAction(actionTypes.TEST_TYPE);
export const testActionSuccess = createAction(actionTypes.TEST_SUCCESS);

export const login = createAction(actionTypes.LOGIN);
export const loginSuccess = createAction(actionTypes.LOGIN_SUCCESS);
export const loginFailed = createAction(actionTypes.LOGIN_FAILED);

export const setSideBar = createAction(actionTypes.SET_SIDE_BAR);
