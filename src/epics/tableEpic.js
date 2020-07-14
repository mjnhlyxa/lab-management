import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
    FETCH_TABLE_DEFINITION,
    FETCH_TABLE_DATA,
    UPDATE_TABLE_ROW,
    DELETE_TABLE_ROW,
    ADD_TABLE_ROW,
    SEARCH_IN_TABLE,
} from '../actions/actionTypes';
import { combineEpics } from 'redux-observable';
import {
    fetchTableDefinitionSuccess,
    fetchTableDefinitionFailed,
    fetchTableDataSuccess,
    fetchTableDataFailed,
    updateTableRowSuccess,
    updateTableRowFailed,
    deleteTableRowSuccess,
    deleteTableRowFailed,
    addTableRowSuccess,
    addTableRowFailed,
    searchInTableSuccess,
    searchInTableFailed,
} from 'actions/actions';

export const fetchTableDefinitionEpic = (action$, store, { fetchTableDefinition }) =>
    action$.pipe(
        ofType(FETCH_TABLE_DEFINITION),
        mergeMap(({ payload: api }) =>
            fetchTableDefinition(api).pipe(
                map((res) => {
                    return fetchTableDefinitionSuccess(res.data);
                }),
                catchError((error) => of(fetchTableDefinitionFailed())),
            ),
        ),
    );

export const fetchTableDataEpic = (action$, store, { fetchTableData }) =>
    action$.pipe(
        ofType(FETCH_TABLE_DATA),
        mergeMap(({ payload: api }) =>
            fetchTableData(api).pipe(
                map((res) => {
                    return fetchTableDataSuccess(res.data);
                }),
                catchError((error) => of(fetchTableDataFailed())),
            ),
        ),
    );

export const updateTableRowEpic = (action$, store, { updateTableRow }) =>
    action$.pipe(
        ofType(UPDATE_TABLE_ROW),
        mergeMap(({ payload: { api, data } }) =>
            updateTableRow(api, data).pipe(
                map((res) => {
                    return updateTableRowSuccess(res.data);
                }),
                catchError((error) => of(updateTableRowFailed())),
            ),
        ),
    );

export const deleteTableRowEpic = (action$, store, { deleteTableRow }) =>
    action$.pipe(
        ofType(DELETE_TABLE_ROW),
        mergeMap(({ payload: { api, data } }) =>
            deleteTableRow(api, data).pipe(
                map((res) => {
                    return updateTableRowSuccess(res.data);
                }),
                catchError((error) => of(updateTableRowFailed())),
            ),
        ),
    );

export const searchInTableEpic = (action$, store, { searchInTable }) =>
    action$.pipe(
        ofType(SEARCH_IN_TABLE),
        mergeMap(({ payload: { api, data } }) =>
            searchInTable(api, data).pipe(
                map((res) => {
                    return searchInTableSuccess(res.data);
                }),
                catchError((error) => of(searchInTableFailed())),
            ),
        ),
    );

export default combineEpics(
    fetchTableDefinitionEpic,
    fetchTableDataEpic,
    updateTableRowEpic,
    deleteTableRowEpic,
    searchInTableEpic,
);
