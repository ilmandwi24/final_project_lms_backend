// eslint-disable-next-line import/no-extraneous-dependencies
const MySQL = require('mysql2/promise');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
    host: process.env.MYSQL_CONFIG_HOST || 'localhost',
    user: process.env.MYSQL_CONFIG_USER || 'root',
    password: process.env.MYSQL_CONFIG_PASSWORD || 'password',
    database: process.env.MYSQL_CONFIG_DATABASE || 'lms',
    port: Number(process.env.MYSQL_PORT) || 3306,
    connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const lessonTable = process.env.LESSON_TABLE || 'lessons';

const executeQuery = async (query, values = []) => {
  let connection = null;
  try {
    connection = await connectionPool.getConnection();
    const timeStart = process.hrtime();
    const [result] = await connection.query(query, values);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'Operation', 'INFO'], {
      message: { query, timeTaken }
    });
    if (connection) connection.release();
    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'Operation', 'ERROR'], {
      message: `${error}`
    });
    if (connection) connection.release();
    throw error;
  }
};

const addLessonToCourse = async (courseId, name, content) => {
    const query = `INSERT INTO ${lessonTable} (course, name, content) VALUES (?, ?, ?)`;
    const values = [courseId, name, content];
    await executeQuery(query, values);
};


const getAllLessonByIdCourse = async (courseId) => {
    const query = `SELECT * FROM ${lessonTable} WHERE course= ?`;
    const values = [courseId];
    const result = await executeQuery(query, values);
    return result;
};

const getLessonById = async (courseId, lessonId) => {
    const query = `SELECT * FROM ${lessonTable} WHERE id = ? AND course = ?`;
    const values = [Number(lessonId), Number(courseId)];
    const result = await executeQuery(query, values);
    console.log(result)
    return result;
}

const editLesson = async (lessonId, courseId, name, content) => {
  console.log(lessonId, courseId, name, content)
  const query = `UPDATE ${lessonTable} SET name = ?, content = ? WHERE id = ? AND course = ?`;
  const result = await executeQuery(query, [name, content, Number(lessonId), Number(courseId)]);
  return result?.affectedRows > 0;
};
const deleteLesson = async (courseId, lessonsId) => {
  console.log(courseId, lessonsId)
    const query = `DELETE FROM ${lessonTable} WHERE id = ? AND course = ?`;
    const values = [Number(lessonsId), Number(courseId)];
    const result = await executeQuery(query, values);
    return result.affectedRows > 0;
}

module.exports = {
    getAllLessonByIdCourse,
    getLessonById,
    addLessonToCourse,
    editLesson,
    deleteLesson
};  