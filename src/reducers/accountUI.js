import * as types from '../constants/ActionTypes';


const initialState = {
    getAddressBalancePending: false,
    pullRefreshPending: false
};


export default function (state = initialState, action) {
    const {meta={}, error} = action;
    const {sequence={}} = meta;
    const status = sequence.type;


    switch (action.type) {
        case types.GET_BANLANCE:
            if (meta.type === 'pullRefresh') {
                return {
                    ...state,
                    pullRefreshPending: status === 'start'
                };
            }
            else {
                return {
                    ...state,
                    getAddressBalancePending: status === 'start'
                }
            }
            return state;
        default:
            return state;
    }
}
