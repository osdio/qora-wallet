import qora from 'qora-core';
import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as storage from '../services/storage';
import * as wallet from '../services/wallet';


export const createWallet = createAction(types.CREATE_WALLET, async ({pwd})=> {
    let seed = qora.core.generateSeedByPassword(pwd);
    let account = qora.core.generateAccountFromSeed(seed);
    return await storage.setItem('account', account)
        .then(()=> {
            return {
                seed,
                account
            }
        });
}, ({resolved, rejected})=> {
    return {
        resolved,
        rejected
    }
});


export const encryptWallet = createAction(types.ENCRYPT_WALLET, async ({pwd})=> {

});


export const getAddressInfo = createAction(types.GET_ADDRESS_INFO, wallet.getBalanceByAddress);







