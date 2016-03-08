import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as transactionService from '../services/transaction';


export const send = createAction(types.SEND, transactionService.send, ({resolved, rejected})=> {
    return {
        resolved,
        rejected
    }
});


