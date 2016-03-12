import * as types from '../constants/ActionTypes';


const defaultUnlock = {
    show: false,
    resolved: null,
    rejected: null,
    showSwitch: true
};

const initialState = {
    toast: {
        text: null,
        timeout: 2000,
        id: null
    },
    unlock: defaultUnlock
};


export default function (state = initialState, action) {
    const { payload ={} } = action;
    switch (action.type) {
        case types.TOAST:
            return {
                ...state,
                toast: {
                    ...state.toast,
                    ...payload
                }
            };
        case types.OPEN_UNLOCK:
            return {
                ...state,
                unlock: {
                    ...state.unlock,
                    ...payload,
                    show: true
                }
            };
        case types.CLOSE_UNLOCK:
            return {
                ...state,
                unlock: defaultUnlock
            };
        default :
            return state;
    }
}
