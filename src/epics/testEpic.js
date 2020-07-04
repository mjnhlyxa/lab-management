import { of, Observable } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { ofType } from "redux-observable";
import { LOGIN } from "../actions/actionTypes";
import { combineEpics } from "redux-observable";
import { testActionSuccess } from "../actions/actions";

// export const testEpic = (action$) =>
//   action$.pipe(
//     ofType(TEST_TYPE),
//     mergeMap((action) => of(testActionSuccess({ test: 123 })))
//   );

export const loginEpic = (action$, store, { login }) =>
  action$.pipe(
    ofType(LOGIN),
    mergeMap(({ payload }) => {
      return login(payload).pipe(
        map(() => {
          return testActionSuccess();
        })
      );
    })
  );

// export const loginEpic = (action$, store, { login }) =>
//   action$.ofType(LOGIN).mergeMap((action) =>
//     login(action.payload)
//       .map((res) => {
//         console.log("login succcesss");
//       })
//       .catch((error) => {
//         console.log("login error");
//       })
//   );
export default combineEpics(loginEpic);
