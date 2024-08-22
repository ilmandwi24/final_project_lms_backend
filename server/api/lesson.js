const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const LessonHelper = require('../helpers/LessonHelper');
const MiddlewareHelper = require('../helpers/MiddlewareHelper');

const addLessonToCourse = async (req, res) => {
    try {
        // check validation input
        ValidationHelper.lessonValidation(req.body);
        // get data from json
        const data = await LessonHelper.addLessonToCourse(req);
        // return response success
        return res.send(data); 
    } catch (error) {
        // return response error
        CommonHelper.log(['Lesson', 'Add Lesson', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

const getAllLessonByIdCourse = async (req, res) => {
    try {
        // check validation input
        // get data from json
        const data = await LessonHelper.getAllLessonByIdCourse(req);
        // return response success
        return res.send(data);  
    } catch (error) {   
        // return response error
        CommonHelper.log(['Lesson', 'Get All Lesson', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

const getLessonById = async (req, res) => {
    try {
        // check validation input
        // get data from json
        const data = await LessonHelper.getLessonById(req);
        // return response success
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Lesson', 'Get Lesson', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id,
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

const editLesson = async (req, res) => {
    try {
        // check validation input
        ValidationHelper.lessonValidation(req.body);
        // get data from json
        const data = await LessonHelper.editLesson(req);
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

const deleteLesson = async (req, res) => {
    try {
        // check validation input
        // get data from json
        // console.log("aa")
        const data = await LessonHelper.deleteLesson(req);
        // return response success
        console.log(data)
        return res.send(data);
    } catch (error) {
        // return response error
        CommonHelper.log(['Lesson', 'Delete Lesson', 'ERROR'], {
            message: `${error}`,
            transaction_id: req.headers.transaction_id
        });
        return res.send(CommonHelper.errorResponse(error));
    }
}

router.post('/courses/:id/lessons', CommonHelper.preHandler, MiddlewareHelper.verifyToken, addLessonToCourse); // done
router.get('/courses/:id/lessons', CommonHelper.preHandler, MiddlewareHelper.verifyToken, getAllLessonByIdCourse);
router.get('/courses/:courseId/lessons/:lessonId', CommonHelper.preHandler, MiddlewareHelper.verifyToken, getLessonById);
router.put('/courses/:courseId/lessons/:lessonId', CommonHelper.preHandler, MiddlewareHelper.verifyToken, editLesson);
router.delete('/courses/:courseId/lessons/:lessonId', CommonHelper.preHandler, MiddlewareHelper.verifyToken, deleteLesson);
module.exports = router;