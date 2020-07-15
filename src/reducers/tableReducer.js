import { handleActions } from 'redux-actions';
import {
    FETCH_TABLE_DEFINITION,
    FETCH_TABLE_DEFINITION_SUCCESS,
    FETCH_TABLE_DEFINITION_FAILED,
    FETCH_TABLE_DATA,
    FETCH_TABLE_DATA_SUCCESS,
    FETCH_TABLE_DATA_FAILED,
    UPDATE_TABLE_ROW,
    UPDATE_TABLE_ROW_SUCCESS,
    UPDATE_TABLE_ROW_FAILED,
    DELETE_TABLE_ROW,
    SEARCH_IN_TABLE,
    SEARCH_IN_TABLE_SUCCESS,
    SEARCH_IN_TABLE_FAILED,
    ADD_TABLE_ROW,
    ADD_TABLE_ROW_SUCCESS,
    ADD_TABLE_ROW_FAILED,
} from 'actions/actionTypes';
import { RESPONSE_STATE } from 'utils/constants';

import columns from 'pages/Test/columns.json';
import data from 'pages/Test/data.json';

const initialState = {
    loading: false,
    structure: undefined,
    data: undefined,
    fetchDefinitionState: RESPONSE_STATE.WAITING,
    fetchDataState: RESPONSE_STATE.WAITING,
    updateDataState: RESPONSE_STATE.WAITING,
    addDataState: RESPONSE_STATE.WAITING,
    searchState: RESPONSE_STATE.WAITING,
};

const actions = {
    [FETCH_TABLE_DEFINITION]: (state) => ({
        ...state,
        structure: undefined,
        loading: true,
        fetchDefinitionState: RESPONSE_STATE.WAITING,
    }),
    [FETCH_TABLE_DEFINITION_SUCCESS]: (state, { payload }) => ({
        ...state,
        loading: true,
        structure: payload,
        fetchDefinitionState: RESPONSE_STATE.SUCCESSS,
    }),
    [FETCH_TABLE_DEFINITION_FAILED]: (state) => ({
        ...state,
        loading: false,
        structure: undefined,
        fetchDefinitionState: RESPONSE_STATE.FAILED,
    }),
    [FETCH_TABLE_DATA]: (state) => ({
        ...state,
        data: undefined,
        loading: true,
        fetchDataState: RESPONSE_STATE.WAITING,
    }),
    [FETCH_TABLE_DATA_SUCCESS]: (state, { payload }) => ({
        ...state,
        data: payload,
        loading: false,
        fetchDataState: RESPONSE_STATE.SUCCESSS,
    }),
    [FETCH_TABLE_DATA_FAILED]: (state) => ({
        ...state,
        loading: false,
        data: undefined,
        fetchDataState: RESPONSE_STATE.FAILED,
    }),
    [UPDATE_TABLE_ROW]: (state) => ({
        ...state,
        loading: true,
        updateDataState: RESPONSE_STATE.WAITING,
    }),
    [UPDATE_TABLE_ROW_SUCCESS]: (state) => ({
        ...state,
        loading: false,
        updateDataState: RESPONSE_STATE.SUCCESSS,
    }),
    [UPDATE_TABLE_ROW_FAILED]: (state) => ({
        ...state,
        loading: false,
        updateDataState: RESPONSE_STATE.FAILED,
    }),
    [SEARCH_IN_TABLE]: (state) => ({
        ...state,
        loading: true,
        searchState: RESPONSE_STATE.WAITING,
    }),
    [SEARCH_IN_TABLE_SUCCESS]: (state, { payload }) => ({
        ...state,
        loading: false,
        data: payload,
        searchState: RESPONSE_STATE.SUCCESSS,
    }),
    [SEARCH_IN_TABLE_FAILED]: (state) => ({
        ...state,
        loading: false,
        searchState: RESPONSE_STATE.FAILED,
    }),
    [ADD_TABLE_ROW]: (state) => ({
        ...state,
        loading: true,
        addDataState: RESPONSE_STATE.WAITING,
    }),
    [ADD_TABLE_ROW_SUCCESS]: (state, {payload}) => ({
        ...state,
        loading: false,
        addDataState: RESPONSE_STATE.SUCCESSS,
    }),
    [ADD_TABLE_ROW_FAILED]: (state) => ({
        ...state,
        loading: false,
        addDataState: RESPONSE_STATE.FAILED,
    }),
};

export default handleActions(actions, initialState);
