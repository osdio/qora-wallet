import * as types from '../constants/ActionTypes';


const initialState = {
    sendPending: false
};


export default function (state = initialState, action) {
    const { meta={}, error } = action;
    const { sequence={} } = meta;
    const status = sequence.type;


    switch (action.type) {
        case types.SEND:
            return {
                ...state,
                sendPending: status === 'start'
            };
        default:
            return state;
    }
}
