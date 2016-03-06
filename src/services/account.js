import * as storage from './storage';
import * as req from './request';


export function getBalanceByAddress(address) {
    return req.get('/index/blockexplorer.json', {
            balance: address
        })
        .then(data=> {
            if (!data.lastBlock) {
                throw 'getBalanceByAddress Error';
            }
            return {
                lastBlock: data.lastBlock,
                balance: data[address]
            }
        })
}
