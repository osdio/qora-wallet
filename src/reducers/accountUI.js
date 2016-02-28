import * as types from '../constants/ActionTypes';


const initialState = {
    getAddressInfoPending: false
};


export default function (state = initialState, action) {
    const { meta={}, error } = action;
    const { sequence={} } = meta;
    const status = sequence.type;


    switch (action.type) {
        case types.GET_ADDRESS_INFO:
            return {
                ...state,
                getAddressInfoPending: status === 'start'
            };
        default:
            return state;
    }
}
