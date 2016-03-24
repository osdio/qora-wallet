import * as types from '../constants/ActionTypes';


const initialState = {
    unconfirmedTransaction: []
};


function indexOf(item, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].signature === item.signature) {
            return i;
        }
    }
    return -1;
}


function removeDeadTransaction(arr) {
    var temp = [];
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'object') {
            temp.push(i);
        }
        else if (!arr[i].signature) {
            temp.push(i);
        }
    }
    temp.forEach(i=> {
        arr.splice(i, 1);
    });
}


export default function (state = initialState, action) {
    const {payload = {}, meta = {}, error} = action;
    const {sequence = {}} = meta;


    if (sequence.type === 'start' || error) {
        if (action.type === types.SYNC_TX_INFO) {
            removeDeadTransaction(state.unconfirmedTransaction);
            return {
                ...state,
                unconfirmedTransaction: state.unconfirmedTransaction.concat([])
            }
        }
        return state;
    }

    switch (action.type) {
        case types.SEND:
        case types.REGISTER_NAME:
            if (typeof payload === 'object' && sequence.type === 'next' && payload.signature) {
                return {
                    ...state,
                    unconfirmedTransaction: [payload].concat(state.unconfirmedTransaction)
                };
            }
            return state;
        case types.SYNC_TX_INFO:
            removeDeadTransaction(state.unconfirmedTransaction);
            let {transaction={}} = payload;
            let index = indexOf(transaction, state.unconfirmedTransaction);
            if (index > -1) {
                if (transaction.confirmations > 0) {
                    state.unconfirmedTransaction.splice(index, 1);
                }
                else {
                    state.unconfirmedTransaction[index] = {
                        ...state.unconfirmedTransaction[index],
                        ...transaction
                    };
                }

                return {
                    ...state,
                    unconfirmedTransaction: state.unconfirmedTransaction.concat([])
                }
            }
            return state;
        case types.GET_TRANSACTION_FROM_STORAGE:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}
