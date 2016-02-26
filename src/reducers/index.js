import { combineReducers } from 'redux';
import utils from './utils';
import wallet from './wallet';
import walletUI from './walletUI';

export default combineReducers({
    utils,
    wallet,
    walletUI
});
