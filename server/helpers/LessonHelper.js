const Boom = require('boom');

const CommonHelper = require('./CommonHelper');

const lesson = require('../services/Lesson');

const addLessonToCourse = async (req) => {
    try {
        // courseId, lessonId
        const data = await lesson.addLessonTOCourse(req.body.courseId, req.body.lessonId);
        return data;
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
        const data = await lesson.getAllLessonByIdCourse(req.body.instructorId);
        //   const dataId = await LaptopDb.getListIdLaptop();
        //   const ids = dataId.map(item => item.id);

        if (data.length === 0) {
            return Boom.notFound('Course not found');
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
        const data = await lesson.getLessonById(req.body.instructorId);
        //   const dataId = await LaptopDb.getListIdLaptop();
        //   const ids = dataId.map(item => item.id);

        if (data.length === 0) {
            return Boom.notFound('Course not found');
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


module.exports = {
    getAllLessonByIdCourse,
    getLessonById,
    addLessonToCourse
};
