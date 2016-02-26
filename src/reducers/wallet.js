import * as types from '../constants/ActionTypes';


const initialState = {
    seed: null,
    accounts: {}
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
                accounts: {
                    0: payload.account
                },
                seed: payload.seed
            };
        default:
            return state;
    }
}
