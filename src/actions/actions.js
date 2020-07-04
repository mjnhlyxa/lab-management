import { createAction } from "redux-actions";
import * as actionTypes from "./actionTypes";

export const testAction = createAction(actionTypes.TEST_TYPE);
export const testActionSuccess = createAction(actionTypes.TEST_SUCCESS);

export const login = createAction(actionTypes.LOGIN);
