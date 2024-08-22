const midtransClient = require('midtrans-client');
const CommonHelper = require('./CommonHelper');
// Create Snap API instance
const testMidtrans = async () => {
    const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: 'SB-Mid-server-05Pq7V1F24BWr5T6Bacch4on'
    });

    const parameter = {
        "transaction_details": {
            "order_id": "YOUR-ORDERID-123456",
            "gross_amount": 10000
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "first_name": "budi",
            "last_name": "pratama",
            "email": "budi.pra@example.com",
            "phone": "08111222333"
        }
    };

    snap.createTransaction(parameter)
        .then((transaction) => {
            // transaction token
            const transactionToken = transaction.token;
            console.log('transactionToken:', transactionToken);
        })


}

const getToken = async (req) => {
    // console.log(req.body)
    try {
        // console.log(req.body,'helpers');
    const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-05Pq7V1F24BWr5T6Bacch4on'
    });
    const parameter = {
        "transaction_details": {
            // "order_id": req.body.cartId,
            "order_id": (Math.random() + 1).toString(36).substring(7),
            "gross_amount": req.body.price,
        },
        "credit_card":{
            "secure" : true
        }
    };

    const result = snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        const transactionToken = transaction.token;

        console.log('transactionToken:',transactionToken);
        return transactionToken;
    }).catch((error)=>{
        console.log(error)
        CommonHelper.log(['Cart Helper', 'getToken', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    });

    return result;
    } catch (error) {
        CommonHelper.log(['Cart Helper', 'deleteCartItem', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}




module.exports = { testMidtrans, getToken }