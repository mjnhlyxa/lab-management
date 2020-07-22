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
    DELETE_TABLE_ROW_SUCCESS,
    DELETE_TABLE_ROW_FAILED,
    SEARCH_IN_TABLE,
    SEARCH_IN_TABLE_SUCCESS,
    SEARCH_IN_TABLE_FAILED,
    ADD_TABLE_ROW,
    ADD_TABLE_ROW_SUCCESS,
    ADD_TABLE_ROW_FAILED,
    SAVE_VISIBLE_COLUMNS,
    SAVE_VISIBLE_COLUMNS_SUCCESS,
    SORT_BY_COLUMN,
    SORT_BY_COLUMN_SUCCESS,
    SORT_BY_COLUMN_FAILED,
} from 'actions/actionTypes';
import { RESPONSE_STATE } from 'utils/constants';

import columns from 'pages/Test/columns.json';
import data from 'pages/Test/data.json';

const initialState = {
    loading: false,
    structure: {},
    data: {},
    fetchDefinitionState: RESPONSE_STATE.WAITING,
    fetchDataState: RESPONSE_STATE.WAITING,
    updateDataState: RESPONSE_STATE.WAITING,
    addDataState: RESPONSE_STATE.WAITING,
    deleteDataState: RESPONSE_STATE.WAITING,
    searchState: RESPONSE_STATE.WAITING,
};

const actions = {
    [FETCH_TABLE_DEFINITION]: (state) => ({
        ...state,
        loading: true,
        fetchDefinitionState: RESPONSE_STATE.WAITING,
    }),
    [FETCH_TABLE_DEFINITION_SUCCESS]: ({ structure, ...rest }, { payload }) => {
        const x = { ...structure, ...payload };
        console.log(x);
        return {
            ...rest,
            loading: true,
            structure: x,
            fetchDefinitionState: RESPONSE_STATE.SUCCESSS,
        };
    },
    [FETCH_TABLE_DEFINITION_FAILED]: (state) => ({
        ...state,
        loading: false,
        fetchDefinitionState: RESPONSE_STATE.FAILED,
    }),
    [FETCH_TABLE_DATA]: (state) => ({
        ...state,
        loading: true,
        fetchDataState: RESPONSE_STATE.WAITING,
    }),
    [FETCH_TABLE_DATA_SUCCESS]: ({ data, ...rest }, { payload }) => {
        return {
            ...rest,
            data: { ...data, ...payload },
            loading: false,
            fetchDataState: RESPONSE_STATE.SUCCESSS,
        };
    },
    [FETCH_TABLE_DATA_FAILED]: (state) => ({
        ...state,
        loading: false,
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
    [SEARCH_IN_TABLE_SUCCESS]: ({ data, ...rest }, { payload }) => ({
        ...rest,
        loading: false,
        data: { ...data, ...payload },
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
    [ADD_TABLE_ROW_SUCCESS]: (state, { payload }) => ({
        ...state,
        loading: false,
        addDataState: RESPONSE_STATE.SUCCESSS,
    }),
    [ADD_TABLE_ROW_FAILED]: (state) => ({
        ...state,
        loading: false,
        addDataState: RESPONSE_STATE.FAILED,
    }),
    [DELETE_TABLE_ROW]: (state) => ({
        ...state,
        loading: true,
        deleteDataState: RESPONSE_STATE.WAITING,
    }),
    [DELETE_TABLE_ROW_SUCCESS]: (state) => ({
        ...state,
        loading: false,
        deleteDataState: RESPONSE_STATE.SUCCESSS,
    }),
    [DELETE_TABLE_ROW_FAILED]: (state) => ({
        ...state,
        loading: false,
        deleteDataState: RESPONSE_STATE.FAILED,
    }),
    [SORT_BY_COLUMN]: (state) => ({
        ...state,
        loading: true,
        fetchDataState: RESPONSE_STATE.WAITING,
    }),
    [SORT_BY_COLUMN_SUCCESS]: ({ data, ...rest }, { payload }) => ({
        ...rest,
        loading: false,
        data: { ...data, ...payload },
        fetchDataState: RESPONSE_STATE.SUCCESSS,
    }),
    [SORT_BY_COLUMN_FAILED]: (state) => ({
        ...state,
        loading: false,
        fetchDataState: RESPONSE_STATE.FAILED,
    }),
};

export default handleActions(actions, initialState);
