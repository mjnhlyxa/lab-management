import { handleActions } from 'redux-actions';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from 'actions/actionTypes';
import { RESPONSE_STATE } from 'utils/constants';
import utils from '@coreui/utils/src';

const initialState = {
    user: undefined,
    loading: false,
    loginState: RESPONSE_STATE.WAITING,
};

const actions = {
    [LOGIN]: (state) => ({
        ...state,
        user: undefined,
        loading: true,
        loginState: RESPONSE_STATE.WAITING,
    }),
    [LOGIN_SUCCESS]: (state, { payload }) => ({
        ...state,
        loading: false,
        loginState: RESPONSE_STATE.SUCCESSS,
        user: payload,
    }),
    [LOGIN_FAILED]: (state, { payload }) => ({
        ...state,
        loading: false,
        loginState: RESPONSE_STATE.FAILED,
        user: payload,
    }),
};

export default handleActions(actions, initialState);
