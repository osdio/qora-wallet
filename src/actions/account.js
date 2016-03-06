import qora from 'qora-core';
import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as storage from '../services/storage';
import * as accountService from '../services/account';


export const getAccountFromStorage = createAction(types.GET_ACCOUNT_FROM_STORAGE, async ()=> {
    return storage.getItem('account');
}, (resolved, rejected)=> {
    return {
        resolved,
        rejected
    }
});


export const getBalance = createAction(types.GET_BANLANCE, accountService.getBalanceByAddress, ()=> {
    return {
        sync: 'account'
    }
});







