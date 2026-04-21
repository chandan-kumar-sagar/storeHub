const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = pool.promise();

//  NEW: get connection for transaction
const getConnection = async () => {
  return await db.getConnection();
};

module.exports = {
  db,
  getConnection,
};
