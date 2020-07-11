import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOGIN, LOGIN_FAILED, GET_USERS_DEFINITION, GET_ALL_USERS } from '../actions/actionTypes';
import { combineEpics } from 'redux-observable';
import {
    loginSuccess,
    loginFailed,
    getUserDefinitionSuccess,
    getUserDefinitionFailed,
    getAllUsersSuccess,
    getAllUsersFailed,
} from 'actions/actions';

export const loginEpic = (action$, store, { login }) =>
    action$.pipe(
        ofType(LOGIN),
        mergeMap((action) =>
            login(action.payload).pipe(
                map((res) => {
                    return loginSuccess(res.data);
                }),
                catchError((error) => of(loginFailed())),
            ),
        ),
    );

export const getUserDefinitionEpic = (action$, store, { getUserDefinition }) =>
    action$.pipe(
        ofType(GET_USERS_DEFINITION),
        mergeMap((action) =>
            getUserDefinition().pipe(
                map((res) => {
                    return getUserDefinitionSuccess(res.data);
                }),
                catchError((error) => of(getUserDefinitionFailed())),
            ),
        ),
    );

export const getAllUsersEpic = (action$, store, { getAllUsers }) =>
    action$.pipe(
        ofType(GET_ALL_USERS),
        mergeMap((action) =>
            getAllUsers().pipe(
                map((res) => {
                    return getAllUsersSuccess(res.data);
                }),
                catchError((error) => of(getAllUsersFailed())),
            ),
        ),
    );

export const deleteUserEpic = (action$, store, { getAllUsers }) =>
    action$.pipe(
        ofType(GET_ALL_USERS),
        mergeMap((action) =>
            getAllUsers().pipe(
                map((res) => {
                    return getAllUsersSuccess(res.data);
                }),
                catchError((error) => of(getAllUsersFailed())),
            ),
        ),
    );

export default combineEpics(loginEpic, getUserDefinitionEpic, getAllUsersEpic);
