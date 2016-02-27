import qora from 'qora-core';
import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as storage from '../services/storage';


export const createWallet = createAction(types.CREATE_WALLET, async ({pwd})=> {
    let seed = qora.core.generateSeedByPassword(pwd);
    let account = qora.core.generateAccountFromSeed(seed);
    return await storage.setItem('account', {
            address: account.address
        })
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


export const encryptWallet = createAction(types.ENCRYPT_WALLET, async ({pwd, wallet})=> {
    const encrypted = qora.core.encrypt(JSON.stringify(wallet), pwd);
    return storage.setItem('wallet', encrypted);
}, ({resolved, rejected})=> {
    return {
        resolved,
        rejected
    }
});


export const getWalletFormStorage = createAction(types.GET_WALLET_FROM_STORAGE, ()=> {
    return storage.getItem('wallet');
}, ({resolved, rejected})=> {
    return {
        resolved,
        rejected
    }
});


export const decryptWallet = createAction(types.DECRYPTE_WALLET, ({encryptWallet, pwd})=> {
    return qora.core.decrypt(encryptWallet, pwd);
});
