import qora from 'qora-core';
import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as storage from '../services/storage';
import * as accountService from '../services/account';


export const getAddressInfoFromStorage = createAction(types.GET_ADDRESS_INFO_FROM_STORAGE, async ()=> {
    return storage.getItem('account');
}, (resolved, rejected)=> {
    return {
        resolved,
        rejected
    }
});


export const getAddressInfo = createAction(types.GET_ADDRESS_INFO, accountService.getBalanceByAddress);







