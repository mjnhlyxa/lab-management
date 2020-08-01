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
export const changePassword = createAction(actionTypes.CHANGE_PASSWORD);
export const changePasswordSuccess = createAction(actionTypes.CHANGE_PASSWORD_SUCCESS);
export const changePasswordFailed = createAction(actionTypes.CHANGE_PASSWORD_FAILED);

// table
export const activateTable = createAction(actionTypes.ACTIVATE_TABLE);
export const deactivateTable = createAction(actionTypes.DEACTIVATE_TABLE);
export const fetchTableDefinition = createAction(actionTypes.FETCH_TABLE_DEFINITION);
export const fetchTableDefinitionSuccess = createAction(actionTypes.FETCH_TABLE_DEFINITION_SUCCESS);
export const fetchTableDefinitionFailed = createAction(actionTypes.FETCH_TABLE_DEFINITION_FAILED);
export const fetchTableData = createAction(actionTypes.FETCH_TABLE_DATA);
export const fetchTableDataSuccess = createAction(actionTypes.FETCH_TABLE_DATA_SUCCESS);
export const fetchTableDataFailed = createAction(actionTypes.FETCH_TABLE_DATA_FAILED);
export const updateTableRow = createAction(actionTypes.UPDATE_TABLE_ROW);
export const updateTableRowSuccess = createAction(actionTypes.UPDATE_TABLE_ROW_SUCCESS);
export const updateTableRowFailed = createAction(actionTypes.UPDATE_TABLE_ROW_FAILED);
export const deleteTableRow = createAction(actionTypes.DELETE_TABLE_ROW);
export const deleteTableRowSuccess = createAction(actionTypes.DELETE_TABLE_ROW_SUCCESS);
export const deleteTableRowFailed = createAction(actionTypes.DELETE_TABLE_ROW_FAILED);
export const addTableRow = createAction(actionTypes.ADD_TABLE_ROW);
export const addTableRowSuccess = createAction(actionTypes.ADD_TABLE_ROW_SUCCESS);
export const addTableRowFailed = createAction(actionTypes.ADD_TABLE_ROW_FAILED);
export const searchInTable = createAction(actionTypes.SEARCH_IN_TABLE);
export const searchInTableSuccess = createAction(actionTypes.SEARCH_IN_TABLE_SUCCESS);
export const searchInTableFailed = createAction(actionTypes.SEARCH_IN_TABLE_FAILED);
export const saveVisibleColumns = createAction(actionTypes.SAVE_VISIBLE_COLUMNS);
export const saveVisibleColumnsSuccess = createAction(actionTypes.SAVE_VISIBLE_COLUMNS_SUCCESS);
export const saveVisibleColumnsFailed = createAction(actionTypes.SAVE_VISIBLE_COLUMNS_FAILED);
export const sortByColumn = createAction(actionTypes.SORT_BY_COLUMN);
export const sortByColumnSuccess = createAction(actionTypes.SORT_BY_COLUMN_SUCCESS);
export const sortByColumnFailed = createAction(actionTypes.SORT_BY_COLUMN_FAILED);

// Modal
export const updateStack = createAction(actionTypes.UPDATE_MODAL);
export const showModal = createAction(actionTypes.SHOW_MODAL);
export const hideModal = createAction(actionTypes.HIDE_MODAL);
export const hideAllModal = createAction(actionTypes.HIDE_ALL_MODAL);
export const showGenericErrorModal = createAction(actionTypes.SHOW_GENERIC_ERROR_MODAL);
