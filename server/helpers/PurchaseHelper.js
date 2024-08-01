const CommonHelper = require('./CommonHelper');

const purchase = require('../services/Purchase');


const addPurchase = async (req) => {
    try {
        // userId,courseId
        const data = await purchase.addPurchase(req.body.userId, req.body.courseId);
        return data;
    } catch (error) {
        CommonHelper.log(['Purchase Helper', 'addPurchase', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

module.exports = {
    addPurchase
};