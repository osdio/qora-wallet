import * as req from './request';

const options = {metaType: 'form'};


export function getLastReference(address) {
    return req.post('/index/api.html', {
            type: 'get',
            apiurl: encodeURI(`/addresses/lastreference/${address}/unconfirmed`)
        }, options)
        .then((data)=> {
            if (data.type === 'success') {
                return data.result;
            }
            throw 'getLastReference Error';
        })
}


export async function processTx(txRaw) {
    return req.post('/index/api.html', {
            type: 'post',
            apiurl: "/transactions/process",
            json: txRaw
        }, options)
        .then(data=> {
            if (data.type === 'success') {
                return JSON.parse(data.result);
            }
            throw data;
        });
}


export async function getTxInfo(tx) {
    return req.get('/index/blockexplorer.json', {
            tx
        })
        .then(data=> {
            if (!data) throw 'sync tx status error';
            let transactionOb = data[1] || {};
            let transaction = transactionOb.transaction;
            if (!transaction) throw 'sync tx status error, transaction is empty';
            transaction = {
                ...transaction,
                typeStr: transactionOb.type
            };
            return {
                transaction,
                lastBlock: data.lastBlock,
                tx
            }
        })
}
