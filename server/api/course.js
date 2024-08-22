const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const CourseHelper = require('../helpers/CourseHelper');
const MiddlewareHelper = require('../helpers/MiddlewareHelper');

const addCourse = async (req, res) => {
    try {
        // check validation input  
        ValidationHelper.coursesValidation(req.body);
        
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

const editCourse = async (req, res) => {
    try {
        // check validation input
        ValidationHelper.coursesValidation(req.body);
        // get data from json
        const data = await CourseHelper.editCourse(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Lesson', 'Edit Lesson', 'ERROR'], {
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
        const data = await CourseHelper.deleteCourse(req);
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
        const data = await CourseHelper.getAllCourse(req);
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
        const data = await CourseHelper.getAllCourseByInstructor(req);
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





router.post('/courses/add', CommonHelper.preHandler, MiddlewareHelper.verifyToken, addCourse);
router.get('/courses', CommonHelper.preHandler, getAllCourse);
router.get('/courses/instructors/:id',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, getAllCourseByInstructor);
router.put('/courses/:id/instructors/:instructorId',  CommonHelper.preHandler, MiddlewareHelper.verifyToken, editCourse);
router.delete('/courses/:id/instructors/:instructorId', CommonHelper.preHandler, MiddlewareHelper.verifyToken, deleteCourse);
// req.params.id, req.params.instructorId, req.body.name, req.body.description, req.body.price

module.exports = router;

