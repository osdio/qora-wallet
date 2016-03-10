import { combineReducers } from 'redux';
import utils from './utils';
import wallet from './wallet';
import walletUI from './walletUI';
import account from './account';
import accountUI from './accountUI';
import transaction from './transaction';
import transactionUI from './transactionUI';

export default combineReducers({
    utils,
    wallet,
    walletUI,
    account,
    accountUI,
    transaction,
    transactionUI
});
