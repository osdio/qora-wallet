import qora from 'qora-core';
import * as req from './request';

const options = {metaType: 'form'};

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


export async function send({encryptWallet, pwd, address, amount, fee, recipient}) {
    const lastReference = await getLastReference(address);
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
