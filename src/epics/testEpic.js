import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOGIN, LOGIN_FAILED, GET_USERS_DEFINITION } from 'actions/actionTypes';
import { combineEpics } from 'redux-observable';
import { loginSuccess, loginFailed, getUserDefinitionSuccess, getUserDefinitionFailed } from 'actions/actions';

export const getUsersEpic = (action$, store, { getUserDefinition }) =>
    action$.pipe(
        ofType(GET_USERS_DEFINITION),
        mergeMap((action) =>
            getUserDefinition().pipe(
                map((res) => {
                    return getUserDefinitionSuccess();
                }),
                catchError((error) => of(getUserDefinitionFailed())),
            ),
        ),
    );

export default combineEpics(getUsersEpic);
