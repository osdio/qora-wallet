import * as types from '../constants/ActionTypes';


const initialState = {
    getAddressBalancePending: false
};


export default function (state = initialState, action) {
    const { meta={}, error } = action;
    const { sequence={} } = meta;
    const status = sequence.type;


    switch (action.type) {
        case types.GET_BANLANCE:
            return {
                ...state,
                getAddressBalancePending: status === 'start'
            };
        default:
            return state;
    }
}
