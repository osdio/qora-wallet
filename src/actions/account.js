import qora from 'qora-core';
import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as storage from '../services/storage';
import * as accountService from '../services/account';


export const getAccountFromStorage = createAction(types.GET_ACCOUNT_FROM_STORAGE, async ()=> {
    return storage.getItem('account')
        .then((account)=> {
            if (!account || !account.address) {
                throw 'Address is empty'
            }
            return account;
        });
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


export const update = createAction(types.UPDATE);

export const startUpdate = createAction(types.START_UPDATE);


export const getAddressByName = createAction(types.GET_ADDRESS_BY_NAME, async ()=> {

});





