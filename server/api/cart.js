const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const CartHelper = require('../helpers/CartHelper');
const MiddlewareHelper = require('../helpers/MiddlewareHelper');

const getCart = async (req, res) => {
    try {
        // check validation input
        // get data from json
        const data = await CartHelper.getCart(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Cart', 'Get Cart', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}   

const getCountCart = async (req, res) => {
    try {
        // check validation input
        // get data from json
        const data = await CartHelper.getCountCart(req);
        // return response success
        return res.send(data);      
    } catch (error) {           
        // return response error
        CommonHelper.log(['Cart', 'Get Count Cart', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}    

const addCourseToCartItems = async (req, res) => {
    try {
        // check validation input
        // get data from json
        const data = await CartHelper.addCourseToCartItems(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Cart', 'Add Course To Cart', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}   

const deleteCartItem = async (req, res) => {
    try {
        // check validation input
        // get data from json
        const data = await CartHelper.deleteCartItem(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Cart', 'Delete Cart Item', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }      
}
router.get('/carts/users/:userId',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, getCart);
router.get('/carts/users/:userId/count',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, getCountCart);
router.delete('/carts/:cartId/courses/:courseId',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, deleteCartItem);
router.post('/carts/cartitems/',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, addCourseToCartItems);

module.exports = router;