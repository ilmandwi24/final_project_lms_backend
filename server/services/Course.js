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

const courseTable = process.env.COURSE_TABLE || 'courses';

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

const getAllCourse = async () => {
    const query = `SELECT * FROM ${courseTable}`;
    const values = [];
    const result = await executeQuery(query, values);
    return result;
};

const getAllCourseByIntructor = async (instructorId) => {
    const query = `SELECT * FROM ${courseTable} WHERE instructor_id = ?`;
    const values = [instructorId];
    const result = await executeQuery(query, values);
    return result;
};

const addCourse = async (name,description,instructorId) => {
    const query = `INSERT INTO ${courseTable} (name, description, instructor_id) VALUES (?, ?, ?, ?, ?)`;
    const values = [name,description,instructorId];
    await executeQuery(query, values);

};

const deleteCourse = async (id) => {
    const query = `DELETE FROM ${courseTable} WHERE id = ?`;
    const values = [id];
    await executeQuery(query, values);
  };

  module.exports = {
    // getListPhonebook,
   
    getAllCourse,
    getAllCourseByIntructor,
    addCourse,
    deleteCourse
    // editPhonebook,
    // deletePhonebook
};

