const Boom = require('boom');

const CommonHelper = require('./CommonHelper');

const cart = require('../services/Cart');

// const addCart = async (req) => {
//     try {
//         // check email if already exist
//         const getEmailAction = await cart.getEmailCart(req.body.email);
        
//         if (getEmailAction.length !==0) {
//             return Boom.conflict(`Email ${req.body.email} is already register`);
//         }
//         // Check password
//         const passwordHash = await CommonHelper.hashPassword(req.body.password);
//         const dataHasil = await cart.addCart(req.body.email, req.body.name,passwordHash);
//         // console.log(dataHasil.insertId,"id");
//         await cart.createCart(dataHasil.insertId);
//         return "registration successful";
//     } catch (error) {
//         CommonHelper.log(['Cart Helper', 'addCart', 'ERROR'], { message: `${error}` });
//         throw CommonHelper.errorResponse(error);
//     }
// };

const getCart = async (req) => {
    try {
        const dataResult= await cart.getCart(req.params.userId);
        // const data = await cart.getCart(dataCart.id);
        if (dataResult.length === 0) {
            return Boom.notFound('Cart not found');
        }
        const totalPrice = dataResult.reduce((total, course) => total + course.price, 0);

        const data ={
            count: dataResult.length,
            totalPrice,
            list: {
                data:dataResult
            }
        }
        return data;
    } catch (error) {
        CommonHelper.log(['Cart Helper', 'getCart', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

const getCountCart = async (req) => {
    try {
        const dataResult= await cart.getCountCart(req.params.userId);
        // const data = await cart.getCart(dataCart.id);
        if (dataResult.length === 0) {
            return Boom.notFound('Cart not found');
        }
        // const data ={
        //     count: dataResult.length,
        //     list: dataResult
        // }
        const { cart_id, ...updatedCartData } = dataResult[0];

        return updatedCartData;
    } catch (error) {
        CommonHelper.log(['Cart Helper', 'getCart', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

const addCourseToCartItems = async (req) => {
    try {
        const checkCourse = await cart.getCourseInCart(req.body.cartId, req.body.courseId);
        // console.log(checkCourse,"checkCourse");
        if (checkCourse.length !== 0) {
            return Boom.conflict('Course already in cart');
        }
        // console.log(req.body)
        await cart.addCourseToCartItems(req.body.cartId, req.body.courseId);   
    
        return "add success";
    } catch (error) {
        CommonHelper.log(['Cart Helper', 'addCourseToCartItems', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}
const deleteCartItem = async (req) => {
    try {
        const data = await cart.deleteCartItem(req.params.cartId, req.params.courseId);
        if (!data) {
            return Boom.notFound('Cart item not found');
        }
        return "delete success";
    } catch (error) {
        CommonHelper.log(['Cart Helper', 'deleteCartItem', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

module.exports = {
    getCart,
    getCountCart,
    deleteCartItem,
    addCourseToCartItems
}