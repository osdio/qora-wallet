import qora from 'qora-core';
import * as req from './request';

const options = {metaType: 'form'};


function findUnconfirmedLastReference(arr) {
    return arr.filter(item=> {
        return item.confirmations === 0
    });
}


export function getLastReference(address) {
    return req.post('/index/api.html', {
            type: 'get',
            apiurl: encodeURI('/addresses/lastreference/' + address)
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


export async function send({encryptWallet, pwd, address, amount, fee, recipient, unconfirmedTransaction}) {
    unconfirmedTransaction = findUnconfirmedLastReference(unconfirmedTransaction);
    let lastReference;
    if (!unconfirmedTransaction.length) {
        lastReference = await getLastReference(address);
    }
    else {
        lastReference = unconfirmedTransaction[0].signature;
    }
    const wallet = JSON.parse(qora.core.decrypt(encryptWallet, pwd));
    const txRaw = qora.transaction.generatePaymentTransactionRaw({
        seed: wallet.seed,
        lastReference,
        recipient,
        amount,
        fee
    });
    return await processTx(txRaw);
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
