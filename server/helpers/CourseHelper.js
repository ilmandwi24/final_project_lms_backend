const Boom = require('boom');

const CommonHelper = require('./CommonHelper');

const course = require('../services/Course');

const addCourse = async (req) => {
    try {
        await course.addCourse(req.body.name, req.body.description, req.body.instructorId, req.body.price);
        return `Added '${req.body.name}' to course`;
    } catch (error) {

        CommonHelper.log(['Course Helper', 'addCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

const getAllCourse = async (req) => {
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
        const data = await course.getAllCourse();
        //   const dataId = await LaptopDb.getListIdLaptop();
        //   const ids = dataId.map(item => item.id);

        if (data.length === 0) {
            return Boom.notFound('Course not found');
        }
        let limit = parseInt(req.query.limit, 10) || data.length;
        limit = Math.max(0, Math.min(limit, data.length)); // Ensure limit is within valid range

        const dataResult = {
            count: limit,
            // listId: ids,
            list: data.slice(0, limit)
        }
        //   await Redis.setWithExpire('laptop', JSON.stringify(dataResult), 86400);

        return dataResult;
    } catch (error) {
        CommonHelper.log(['Course Helper', 'getAllCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
};

const getAllCourseByInstructor = async (req) => {
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
        const data = await course.getAllCourseByIntructor(req.params.id);
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
        CommonHelper.log(['Course Helper', 'getAllCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

const editCourse = async (req) => {
    try {
        const editAction = await course.editCourse(req.params.id, req.params.instructorId, req.body.name, req.body.description, req.body.price);
        // name, description,price
        if (!editAction) {
            return Boom.notFound(`The lesson is not found `);
        }
        return `Edited successfully`;
    } catch (error) {
        CommonHelper.log(['Lesson Helper', 'editLesson', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
};


const deleteCourse = async (req) => {
    try {
        const deleteAction = await course.deleteCourse(req.params.id, req.params.instructorId);
        // console.log(deleteAction)
        if (!deleteAction) {
            return Boom.notFound(`The course is not found `);
        }
        return `Delete id ${req.params.id} successfully`;

    } catch (error) {
        CommonHelper.log(['Course Helper', 'deleteCourse', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
}

module.exports = {
    getAllCourse,
    getAllCourseByInstructor,
    addCourse,
    deleteCourse,
    editCourse
};

