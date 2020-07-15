import { handleActions } from 'redux-actions';
import Stack from 'utils/Stack';
import { UPDATE_MODAL, SHOW_GENERIC_ERROR_MODAL, SHOW_MODAL, HIDE_MODAL } from 'actions/actionTypes';

const initialState = {
    stack: new Stack(),
    show: false,
    modal: {},
};

const actions = {
    [UPDATE_MODAL]: (state, { payload }) => {
        return {
            ...state,
            stack: payload,
        };
    },
    [SHOW_MODAL]: ({ stack, ...rest }, { payload: modal }) => {
        return {
            ...rest,
            show: true,
            modal,
            stack: stack.push(modal),
        };
    },
    [HIDE_MODAL]: ({ stack, ...rest }) => {
        return {
            ...rest,
            ...(stack.size() >= 2
                ? {
                      show: true,
                      modal: stack.pop().peek(),
                      stack,
                  }
                : {
                      show: false,
                      stack: stack.pop(),
                  }),
        };
    },
    [SHOW_GENERIC_ERROR_MODAL]: ({ stack, ...rest }, { payload: { id, errorCode } = {} }) => {
        const modal = {
            id,
            trackingLabel: errorCode || id,
            tracking: true,
            errorCode,
        };
        return {
            ...rest,
            modal,
            show: true,
            stack: stack.pop(stack.size()).push(modal),
        };
    },
};

export default handleActions(actions, initialState);
