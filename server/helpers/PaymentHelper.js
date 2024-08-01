
const CommonHelper = require('./CommonHelper');

const payment = require('../services/Payment');


const addPayment = async (req) => {
    try {
        // amount, paymentMethod, purchaseId, paymentStatus
        const data = await payment.addPayment(req.body.price, req.body.paymentMethod, req.body.purchaseId, "unpaid");
        return data;
    } catch (error) {
        CommonHelper.log(['Payment Helper', 'addPayment', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

module.exports = {
    addPayment
};