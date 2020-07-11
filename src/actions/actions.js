import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const testAction = createAction(actionTypes.TEST_TYPE);
export const testActionSuccess = createAction(actionTypes.TEST_SUCCESS);

export const login = createAction(actionTypes.LOGIN);
export const loginSuccess = createAction(actionTypes.LOGIN_SUCCESS);
export const loginFailed = createAction(actionTypes.LOGIN_FAILED);

export const setSideBar = createAction(actionTypes.SET_SIDE_BAR);

// users
export const getUserDefinition = createAction(actionTypes.GET_USERS_DEFINITION);
export const getUserDefinitionSuccess = createAction(actionTypes.GET_USERS_DEFINITION_SUCCESS);
export const getUserDefinitionFailed = createAction(actionTypes.GET_USERS_DEFINITION_FAILED);
export const getAllUsers = createAction(actionTypes.GET_ALL_USERS);
export const getAllUsersSuccess = createAction(actionTypes.GET_ALL_USERS_SUCCESS);
export const getAllUsersFailed = createAction(actionTypes.GET_ALL_USERS_FAILED);
