import { handleActions } from 'redux-actions';

import {
    GET_USERS_DEFINITION,
    GET_USERS_DEFINITION_SUCCESS,
    GET_USERS_DEFINITION_FAILED,
    GET_ALL_USERS,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
} from 'actions/actionTypes';
import { RESPONSE_STATE } from 'utils/constants';

const initialState = {
    loading: false,
    getDefinitionState: RESPONSE_STATE.WAITING,
    definition: undefined,
    getAllUsersState: RESPONSE_STATE.WAITING,
    users: undefined,
    changePasswordState: RESPONSE_STATE.WAITING,
};

const actions = {
    [GET_USERS_DEFINITION]: (state) => ({
        ...state,
        loading: true,
        definition: undefined,
    }),
    [GET_USERS_DEFINITION_SUCCESS]: (state, { payload }) => ({
        ...state,
        getDefinitionState: RESPONSE_STATE.SUCCESSS,
        definition: payload,
    }),
    [GET_USERS_DEFINITION_FAILED]: (state) => ({
        ...state,
        getDefinitionState: RESPONSE_STATE.FAILED,
    }),
    [GET_ALL_USERS]: (state) => ({
        ...state,
        loading: true,
        getAllUsersState: RESPONSE_STATE.WAITING,
        users: undefined,
    }),
    [GET_ALL_USERS_SUCCESS]: (state, { payload }) => ({
        ...state,
        loading: false,
        getAllUsersState: RESPONSE_STATE.SUCCESSS,
        users: payload,
    }),
    [GET_ALL_USERS_FAILED]: (state) => ({
        ...state,
        loading: false,
        getAllUsersState: RESPONSE_STATE.FAILED,
        users: undefined,
    }),
    [CHANGE_PASSWORD]: (state) => ({
        ...state,
        changePasswordState: RESPONSE_STATE.WAITING,
    }),
    [CHANGE_PASSWORD_SUCCESS]: (state) => ({
        ...state,
        changePasswordState: RESPONSE_STATE.SUCCESSS,
    }),
    [CHANGE_PASSWORD_FAILED]: (state) => ({
        ...state,
        changePasswordState: RESPONSE_STATE.FAILED,
    }),
};

export default handleActions(actions, initialState);
