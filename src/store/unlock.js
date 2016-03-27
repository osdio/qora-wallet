import qora from 'qora-core';
import {createAction} from 'redux-actions';
import * as utilsActions from '../actions/utils';
import * as types from '../constants/ActionTypes';
import * as transactionService from '../services/transaction';
import * as accountService from '../services/account';


async function getWalletSeed(wallet, openUnlock) {
    return new Promise((resolved, rejected)=> {
        if (wallet.seed) {
            return resolved(wallet.seed);
        }
        openUnlock((pwd)=> {
            try {
                resolved(JSON.parse(qora.core.decrypt(wallet.encryptWallet, pwd)).seed);
            }
            catch (e) {
                rejected(e);
            }
        });
    });
}

async function getLastReference(address, unconfirmedTransaction) {
    let lastReference;
    unconfirmedTransaction = findUnconfirmedLastReference(unconfirmedTransaction);
    if (!unconfirmedTransaction.length) {
        lastReference = await transactionService.getLastReference(address);
    }
    else {
        lastReference = unconfirmedTransaction[0].signature;
    }
    return lastReference;
}


async function getAddressByRecipient(recipient) {
    if (qora.core.getAccountAddressType(recipient) === 'standard') {
        return recipient;
    }

    try {
        let result = await accountService.getAddressByName(recipient);
        if (result && result.owner) {
            return result.owner
        }
    }
    catch (err) {
        return null;
    }
}


function findUnconfirmedLastReference(arr) {
    return arr.filter(item=> {
        return item.confirmations === 0
    });
}


export default ({dispatch, getState})=> next => action => {
    const {account, transaction, wallet} = getState();
    const {unconfirmedTransaction} = transaction;
    const {meta={}, payload={}, error} = action;
    const {unlock} = meta;

    if (__DEV__) {
        console.log(action);
    }

    next(action);


    if (!unlock || error) return;


    if (unlock === 'transaction') {
        const {address} = account;
        dispatch(createAction(action.type, async()=> {
            let txRaw;

            const seed = await getWalletSeed(wallet, (resolved)=> {
                dispatch(utilsActions.openUnlock({
                    resolved
                }));
            });

            const lastReference = await getLastReference(address, unconfirmedTransaction);


            // send qora
            if (action.type === types.SEND) {
                let {fee, recipient, amount} = payload;
                recipient = await getAddressByRecipient(recipient);
                if (!recipient) {
                    throw {
                        msg: '地址错误或者没有找到name相对应的地址'
                    };
                }
                txRaw = qora.transaction.generatePaymentTransactionRaw({
                    seed,
                    lastReference,
                    recipient,
                    amount,
                    fee
                });
            }


            // register name
            if (action.type === types.REGISTER_NAME) {
                const {fee, name, value} = payload;
                txRaw = qora.transaction.generateRegisterNameTransactionRaw({
                    seed,
                    lastReference,
                    name,
                    value,
                    fee,
                    owner: address
                });
            }


            return await transactionService.processTx(txRaw);
        }, ({resolved, rejected})=> {
            return {
                resolved,
                rejected,
                sync: 'transaction'
            };
        })(payload));
    }
}

//var returnExample = {
//    "reference": "ZggAH1d1ZuzXi59hZj2TDezpruGUnYn4N6bzRh4pehwFPaqxBhsUKhzhvYauw6FPrmg2L8R64ALPJu8x7Mu9FzY",
//    "amount": "1.00000000",
//    "signature": "Qcqfnjz8xPksCB5YBYSEfP8iQZ5WB6E2MYDQh5pF3QXPURT6SXSHrmmpg5ygcRyYte6qvBHWCwdSzVrp4uivMRn",
//    "sender": "QPkAnJJG5TfnwQW8vaHgJUmreodXb4ssLr",
//    "fee": "10.00000000",
//    "recipient": "QePQC5SHPMyorXLMHdiRA5WzsSqgiUcWKZ",
//    "type": 2,
//    "confirmations": 0,
//    "timestamp": 1457445616575
//};
