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

const carts = process.env.COURSE_TABLE || 'carts';
const cartItems = process.env.COURSE_TABLE || 'cart_items';

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

const createCart = async (userId) => {
  const query = `INSERT INTO ${carts} (user_id) VALUES (?)`;
  const values = [userId];
  await executeQuery(query, values);
};

const getCart = async (userId) => {
  const query = `select *, courses.name as name, users.name as instructor_name from carts inner join cart_items on carts.id = cart_items.cart_id inner join courses on cart_items.course_id = courses.id inner join users on carts.user_id = users.id where carts.user_id = ${userId} `;
  const values = [userId];
  const result = await executeQuery(query, values);
  return result;
};

const getCountCart = async (userId) => {
  const query = `select cart_items.cart_id, COUNT(*) as jumlah_cart_item from carts inner join cart_items on carts.id = cart_items.cart_id where carts.user_id =${userId} group by cart_items.cart_id`;
  const values = [userId];
  const result = await executeQuery(query, values);
  return result;
};

const deleteCartItem = async (cartId, courseId) => {
  const query = `DELETE FROM ${cartItems} WHERE cart_id = ? AND course_id = ?`;
  const values = [cartId, courseId];
  const result = await executeQuery(query, values);
  return result.affectedRows > 0;
};



// const getCartItems = async (userId) => {
//   const query = `SELECT * FROM ${cartItems} WHERE cart_id = ?`;
//   const values = [userId];
//   const result = await executeQuery(query, values);
//   return result;
// };


module.exports = {
  createCart,
  getCart,
  getCountCart,
  deleteCartItem

};