// Product controller (Admin)
const { insertData } = require("../../utils/dbHelper");
const { rawQuery } = require("../../utils/dbHelper");
const { updateData } = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      discount_price,
      stock,
      category_id,
      image,
    } = req.body;

    if (!name || !price || !stock) {
      throw new ApiError(400, "Required fields missing");
    }

    const productId = await insertData("products", {
      name,
      description,
      price,
      discount_price,
      stock,
      category_id,
      image,
      status: "active",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, { productId }, "Product created"));

  } catch (error) {
    next(error);
  }
};


exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await rawQuery(`
      SELECT p.*, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    return res.json(new ApiResponse(200, products, "Products fetched"));

  } catch (error) {
    next(error);
  }
};




exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await updateData("products", req.body, { id });

    return res.json(new ApiResponse(200, null, "Product updated"));

  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await updateData("products", { status: "inactive" }, { id });

    return res.json(new ApiResponse(200, null, "Product deleted (soft)"));

  } catch (error) {
    next(error);
  }
};
