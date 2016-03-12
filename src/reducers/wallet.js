import * as types from '../constants/ActionTypes';


const initialState = {
    seed: null,
    account: null,
    encryptWallet: null
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
                account: payload.account,
                seed: payload.seed
            };
        case types.ENCRYPT_WALLET:
            return {
                ...state,
                encryptWallet: payload
            };
        case types.DECRYPTE_WALLET:
            if (payload) {
                return {
                    ...state,
                    ...payload
                };
            }
            return state;
        case types.LOCK:
            return {
                ...state,
                seed: null,
                account: null
            };
        case types.GET_WALLET_FROM_STORAGE:
            return {
                ...state,
                encryptWallet: payload
            };
        default:
            return state;
    }
}
