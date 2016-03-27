import * as req from './request';

function filterData(data) {
    if (data.type === 'success') {
        if(__DEV__){
            console.log(data.result);
        }
        return JSON.parse(data.result);
    }
    throw data;
}


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


export function getAddressByName(name) {
    return req.post('/index/api.html', {
            type: 'get',
            apiurl: `/names/${name.toLowerCase()}`
        }, {metaType: 'form'})
        .then(filterData);
}


export function getNameListByAddress(address) {
    return req.post('/index/api.html', {
            type: 'get',
            apiurl: `names/address/${address}`
        }, {metaType: 'form'})
        .then(filterData)
        .then(data=> {
            if (!data || !Array.isArray(data)) {
                return [];
            }
            return data;
        });
}


export async function getUnconfirmedTransactionList(address) {
    return req.get('/index/api.html', {
            type: 'get',
            apiurl: `transactions/unconfirmedof/${address}`
        }, {metaType: 'form'})
        .then(filterData)
        .then(data=> {
            if (!data || !Array.isArray(data)) {
                return [];
            }
            return data;
        });
}


export async function getTransactionList(address, start) {
    return req.get('/index/blockexplorer.json', {
            addr: address,
            start: start
        })
        .then(data=> {
            if (!data || data.error) {
                throw data.error;
            }
            let transactionList = [];
            for (let i = 1; i <= start; i++) {
                if (data[i] && data[i].transaction) {
                    transactionList.push(data[i]);
                }
                else {
                    break;
                }
            }
            return {
                lastBlock: data.lastBlock,
                generatedBlocks: data.generatedBlocks,
                countTx: data.countTx,
                balance: data.balance,
                transactionList
            }
        });
}
