import * as storage from './storage';
import * as req from './request';


export function getBalanceByAddress(address) {
    return req.get('index/blockexplorer.json', {
            addr: address
        })
        .then(data=> {
            if (data.error) {
                throw data.error;
            }
            let result = {
                transaction: []
            };
            Object.keys(data).forEach(key=> {
                if (/\d?/.test(key)) {
                    result.transaction.push({
                        blockHeight: key,
                        ...data[key]
                    });
                }
                else {
                    result[key] = data[key];
                }
            });
            return result;
        })
}
