const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const PurchaseHelper = require('../helpers/PurchaseHelper');
const MiddlewareHelper = require('../helpers/MiddlewareHelper');


const addPurchase = async (req, res) => {
    try {
        // check validation input  
        ValidationHelper.purchaseValidation(req.body);
        // get data from json
        const data = await PurchaseHelper.addPurchase(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Purchase', 'Add Purchase', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}  

router.post('/purchase', CommonHelper.preHandler, MiddlewareHelper.verifyToken, addPurchase);
