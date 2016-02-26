import * as types from '../constants/ActionTypes';


const initialState = {
    createWalletPending: false
};


export default function (state = initialState, action) {
    const { meta={} } = action;
    const { sequence={} } = meta;
    const status = sequence.type;


    switch (action.type) {
        case types.CREATE_WALLET:
            return {
                ...state,
                createWalletPending: status === 'start'
            };
        default:
            return state;
    }
}
