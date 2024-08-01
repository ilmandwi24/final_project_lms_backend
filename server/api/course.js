const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const CourseHelper = require('../helpers/CourseHelper');
const MiddlewareHelper = require('../helpers/MiddlewareHelper');

const addCourse = async (req, res) => {
    try {
        // check validation input  
        ValidationHelper.courseValidation(req.body);
        // get data from json
        const data = await CourseHelper.addCourse(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Course', 'Add Course', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}     

const deleteCourse = async (req, res) => {
    try {
        // check validation input  
        // get data from json
        const data = await CourseHelper.deleteCourse(req.params.id);
        // return response success  
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Course', 'Delete Course', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

const getAllCourse = async (req, res) => {
    try {
        // check validation input  
        // get data from json
        const data = await CourseHelper.getAllCourse();
        // return response success
        return res.send(data); 
    } catch (error) {
        // return response error
        CommonHelper.log(['Course', 'Get All Course', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

const getAllCourseByInstructor = async (req, res) => {
    try {
        // check validation input  
        // get data from json
        const data = await CourseHelper.getAllCourseByInstructor(req.params.id);
        // return response success
        return res.send(data); 
    } catch (error) {
        // return response error
        CommonHelper.log(['Course', 'Get All Course', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}



router.post('/course/add', CommonHelper.preHandler, MiddlewareHelper.verifyToken, addCourse);
router.delete('/course/:id', CommonHelper.preHandler, MiddlewareHelper.verifyToken, deleteCourse);
router.get('/course', CommonHelper.preHandler, getAllCourse);
router.get('/course/instructor/:id',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, getAllCourseByInstructor);
module.exports = router;

