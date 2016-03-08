import * as types from '../constants/ActionTypes';


const initialState = {
    unconfirmedTransition: []
};


export default function (state = initialState, action) {
    const { payload = {}, meta = {}, error } = action;
    const { sequence = {} } = meta;


    if (sequence.type === 'start' || error) {
        return state;
    }

    switch (action.type) {
        case types.SEND:
            return {
                ...state,
                unconfirmedTransition: [payload].concat(state.unconfirmedTransition)
            };
        default:
            return state;
    }
}
