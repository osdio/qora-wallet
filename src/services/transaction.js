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
            console.log(data);
            return data;
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
    const result = await processTx(txRaw);
}
