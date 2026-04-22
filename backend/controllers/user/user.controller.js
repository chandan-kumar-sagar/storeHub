// User controller

const { rawQuery } = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

exports.getAllProducts = async (req, res, next) => {
  try {
    const { search, category, sort } = req.query;

    let query = `
      SELECT p.*, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
    `;

    let values = [];

    if (search) {
      query += " AND p.name LIKE ?";
      values.push(`%${search}%`);
    }

    if (category) {
      query += " AND c.name = ?";
      values.push(category);
    }

    if (sort === "low") query += " ORDER BY p.price ASC";
    else if (sort === "high") query += " ORDER BY p.price DESC";
    else query += " ORDER BY p.created_at DESC";

    const products = await rawQuery(query, values);

    return res.json(new ApiResponse(200, products, "Products fetched"));

  } catch (error) {
    next(error);
  }
};
