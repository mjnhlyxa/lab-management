import { handleActions } from 'redux-actions';

import { SET_SIDE_BAR } from 'actions/actionTypes';

const initialState = {
    sidebarShow: 'responsive',
};

const actions = {
    [SET_SIDE_BAR]: (state, { payload }) => ({
        ...state,
        sidebarShow: payload,
    }),
};

export default handleActions(actions, initialState);
