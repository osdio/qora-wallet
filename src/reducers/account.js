import * as types from '../constants/ActionTypes';


const initialState = {
    address: null,
    balance: 0,
    lastBlock: {},
    nameList: []
};


export default function (state = initialState, action) {
    const {payload = {}, meta = {}, error} = action;
    const {sequence = {}} = meta;


    if (sequence.type === 'start' || error) {
        return state;
    }


    switch (action.type) {
        case types.CREATE_WALLET:
            return {
                ...state,
                address: payload.account.address
            };
        case types.GET_ACCOUNT_FROM_STORAGE:
            return {
                ...state,
                ...payload
            };
        case types.GET_BANLANCE:
            let {balance={}} = payload;
            let amount = balance[0] && balance[0].amount || 0;
            return {
                ...state,
                balance: amount,
                lastBlock: payload.lastBlock
            };
        case types.SYNC_TX_INFO:
            let {lastBlock={}} = payload;
            return {
                ...state,
                lastBlock
            };
        case types.GET_NAME_LIST_BY_ADDRESS:
            return {
                ...state,
                nameList: payload
            };
        default:
            return state;
    }
}
