import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { CHANGE_PASSWORD } from 'actions/actionTypes';
import { combineEpics } from 'redux-observable';
import { changePasswordSuccess, changePasswordFailed } from 'actions/actions';

export const changePasswordEpic = (action$, store, { changePassword }) =>
    action$.pipe(
        ofType(CHANGE_PASSWORD),
        mergeMap(({ payload: { api, data } }) =>
            changePassword(api, data).pipe(
                map(() => {
                    return changePasswordSuccess();
                }),
                catchError((error) => of(changePasswordFailed())),
            ),
        ),
    );

export default combineEpics(changePasswordEpic);
