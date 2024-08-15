const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const PaymentHelper = require('../helpers/PaymentHelper');
const MiddlewareHelper = require('../helpers/MiddlewareHelper');

const addPayment = async (req, res) => {
    try {
        // check validation input  
        ValidationHelper.paymentValidation(req.body);
        // get data from json
        const data = await PaymentHelper.addPayment(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Payment', 'Add Payment', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

router.post('/payment', CommonHelper.preHandler, MiddlewareHelper.verifyToken, addPayment);