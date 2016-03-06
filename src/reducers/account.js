import * as types from '../constants/ActionTypes';


const initialState = {
    address: null,
    balance: 0,
    lastBlock: {}
};


export default function (state = initialState, action) {
    const { payload = {}, meta = {}, error } = action;
    const { sequence = {} } = meta;


    if (sequence.type === 'start' || error) {
        return state;
    }


    switch (action.type) {
        case types.CREATE_WALLET:
            return {
                ...state,
                address: payload.account.address
            };
        case types.GET_ADDRESS_INFO_FROM_STORAGE:
            return {
                ...state,
                address: payload.address
            };
        case types.GET_BANLANCE:
            let { balance={} } = payload;
            let amount = balance[0] && balance[0].amount || 0;
            return {
                ...state,
                balance: amount,
                lastBlock: payload.lastBlock
            };
        default:
            return state;
    }
}
