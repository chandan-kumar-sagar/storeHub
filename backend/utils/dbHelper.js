const { db } = require("../config/db");

//  Generic Query Executor
const executeQuery = async (query, params = []) => {
  try {
    const [result] = await db.query(query, params);
    return result;
  } catch (error) {
    console.error("DB Error:", error);
    throw error;
  }
};

//  GET DATA (SELECT)
const getData = async (table, conditions = {}, fields = "*") => {
  let query = `SELECT ${fields} FROM ${table}`;
  let values = [];

  if (Object.keys(conditions).length) {
    const whereClause = Object.keys(conditions)
      .map((key) => `${key} = ?`)
      .join(" AND ");

    query += ` WHERE ${whereClause}`;
    values = Object.values(conditions);
  }

  return await executeQuery(query, values);
};

//  INSERT DATA
const insertData = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `
    INSERT INTO ${table} (${keys.join(", ")})
    VALUES (${keys.map(() => "?").join(", ")})
  `;

  const result = await executeQuery(query, values);
  return result.insertId;
};

//  UPDATE DATA
const updateData = async (table, data, conditions) => {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");

  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(" AND ");

  const values = [
    ...Object.values(data),
    ...Object.values(conditions),
  ];

  const query = `
    UPDATE ${table}
    SET ${setClause}
    WHERE ${whereClause}
  `;

  return await executeQuery(query, values);
};

//  DELETE DATA
const deleteData = async (table, conditions) => {
  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(" AND ");

  const query = `DELETE FROM ${table} WHERE ${whereClause}`;
  const values = Object.values(conditions);

  return await executeQuery(query, values);
};

//  CUSTOM QUERY (ADVANCED USE)
const rawQuery = async (query, params = []) => {
  return await executeQuery(query, params);
};

module.exports = {
  getData,
  insertData,
  updateData,
  deleteData,
  rawQuery,
};
