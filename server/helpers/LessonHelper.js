const Boom = require('boom');

const CommonHelper = require('./CommonHelper');

const lesson = require('../services/Lesson');

const addLessonToCourse = async (req) => {
    try {
        // courseId, lessonId
        await lesson.addLessonToCourse(req.params.id, req.body.name, req.body.content);
        return `Added a lesson to course`;
    } catch (error) {
        CommonHelper.log(['Lesson Helper', 'addLessonTOCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}
const getAllLessonByIdCourse = async (req) => {
    try {
        //   const dataFromRedis = await Redis.getKey('laptop');
        //   if (dataFromRedis) {
        //     CommonHelper.log(['Sample Helper', 'getDataLaptop', 'INFO'], {
        //       message: 'Get data from redis',
        //       key: 'recomendation'
        //     });
        //     // verify Id
        //     const dataId = await LaptopDb.getListIdLaptop();
        //     if (dataId.length === 0) {
        //       return Boom.notFound('Laptop not found');
        //     }
        //     const ids = dataId.map(item => item.id);
        //     const dataRedis = JSON.parse(dataFromRedis);
        //     if (_.isEqual(ids, dataRedis.listId)) {
        //       return dataRedis;
        //     }
        //     const data = await LaptopDb.getListLaptop();
        //     const dataResult = {
        //       count: data.length,
        //       listId: ids,
        //       list: data
        //     }
        //     await Redis.setWithExpire('laptop', JSON.stringify(dataResult), 86400);

        //     return dataResult;

        //   }
        const data = await lesson.getAllLessonByIdCourse(req.params.id);
        //   const dataId = await LaptopDb.getListIdLaptop();
        //   const ids = dataId.map(item => item.id);

        if (data.length === 0) {
            return Boom.notFound('Lesson not available');
        }
        const dataResult = {
            count: data.length,
            // listId: ids,
            list: data
        }
        //   await Redis.setWithExpire('laptop', JSON.stringify(dataResult), 86400);

        return dataResult;
    } catch (error) {
        CommonHelper.log(['Lesson Helper', 'getListCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

const getLessonById = async (req) => {
    try {

        const data = await lesson.getLessonById(req.params.courseId, req.params.lessonId);
        //   const dataId = await LaptopDb.getListIdLaptop();
        //   const ids = dataId.map(item => item.id);

        if (data.length === 0) {
            return Boom.notFound('Lesson not found');
        }
        const dataResult = {
            count: data.length,
            // listId: ids,
            list: data
        }
        //   await Redis.setWithExpire('laptop', JSON.stringify(dataResult), 86400);

        return dataResult;
    } catch (error) {
        CommonHelper.log(['Lesson Helper', 'getListCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

const editLesson = async (req) => {
    try {
        const editAction = await lesson.editLesson(req.params.lessonId, req.params.courseId, req.body.name, req.body.content);
        if (!editAction) {
            return Boom.notFound(`The lesson is not found `);
        }
        return `Edited successfully`;
    } catch (error) {
        CommonHelper.log(['Lesson Helper', 'editLesson', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
};

const deleteLesson = async (req) => {
    try {
        // console.log(req.params)
        const deleteAction = await lesson.deleteLesson(req.params.courseId, req.params.lessonId);
        console.log(deleteAction)
        if (!deleteAction) {
            return Boom.notFound(`Course with id ${req.params.lessonId} not found `);
        }
        return `Delete id ${req.params.lessonId} successfully`;
    } catch (error) {
        CommonHelper.log(['Lesson Helper', 'deleteLesson', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}


``

module.exports = {
    getAllLessonByIdCourse,
    getLessonById,
    addLessonToCourse,
    editLesson,
    deleteLesson
};
