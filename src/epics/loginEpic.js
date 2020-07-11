import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOGIN, LOGIN_FAILED } from '../actions/actionTypes';
import { combineEpics } from 'redux-observable';
import { loginSuccess, loginFailed } from 'actions/actions';


export const loginEpic = (action$, store, { login }) =>
    action$.pipe(
        ofType(LOGIN),
        mergeMap(
            (action) =>
                login(action.payload).pipe(
                    map((res) => {
                        return loginSuccess(res.data);
                    }),
                    catchError((error) =>
                        of(loginFailed()),
                    ),
                ),
        ),
    );

export default combineEpics(loginEpic);
