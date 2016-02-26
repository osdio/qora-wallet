import qora from 'qora-core';
import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import * as storage from '../services/storage';
import * as account from '../services/account';


export const getAddressInfo = createAction(types.GET_ADDRESS_INFO, account.getBalanceByAddress);







