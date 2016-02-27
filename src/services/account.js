import * as storage from './storage';
import * as req from './request';


export function getBalanceByAddress(address) {
    return req.get('/index/blockexplorer.json', {
            addr: address
        })
        .then(data=> {
            console.log(data);
            if (data.error) {
                throw data.error;
            }
            let result = {
                transactions: []
            };
            Object.keys(data).forEach(key=> {
                if (/^\d+$/.test(key)) {
                    result.transactions.push({
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
