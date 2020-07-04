import { handleActions } from 'redux-actions';
import { TEST_SUCCESS } from '../actions/actionTypes';

const initialState = {
    test1: '',
};

const actions = {
    [TEST_SUCCESS]: (state, { payload }) => ({
        ...state,
        test1: payload.test,
    })
};

export default handleActions(actions, initialState);
