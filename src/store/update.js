import * as accountAction from '../actions/account';
import * as transactionAction from '../actions/transaction';


var startUpdate;
const defaultIntervalTime = 10 * 1000;


export default ({dispatch, getState}) => next => action => {
    const {account, transaction} = getState();
    const {address} = account;
    const {unconfirmedTransaction} = transaction;
    const {meta = {}} = action;

    if (action.type === 'UPDATE') {
        dispatch(accountAction.getBalance(address, meta.type));

        if (unconfirmedTransaction.length) {
            if (typeof startUpdate === 'undefined') {
                dispatch({
                    type: 'START_UPDATE'
                });
            }
            unconfirmedTransaction.forEach(item=> {
                if (typeof item === 'object') {
                    dispatch(transactionAction.syncTxInfo(item.signature));
                }
            });
        }
        else {
            clearInterval(startUpdate);
            startUpdate = undefined;
        }
    }

    if (action.type === 'START_UPDATE') {
        if (typeof startUpdate === 'undefined') {
            startUpdate = setInterval(()=> {
                dispatch({
                    type: 'UPDATE'
                });
            }, defaultIntervalTime);
        }
    }
    next(action);
}
