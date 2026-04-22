const { insertData, getData, updateData } = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

// 🔹 Create Category
// 🔹 Create Category
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ApiError(400, "Category name required");
    }

    // check duplicate
    const existing = await getData("categories", { name });

    if (existing.length) {
      throw new ApiError(400, "Category already exists");
    }

    const id = await insertData("categories", {
      name,
      status: "active",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, { id }, "Category created"));

  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await getData("categories", {});

    return res.json(new ApiResponse(200, categories, "Categories fetched"));

  } catch (error) {
    next(error);
  }
};


exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await updateData("categories", req.body, { id });

    return res.json(new ApiResponse(200, null, "Category updated"));

  } catch (error) {
    next(error);
  }
};


exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await updateData("categories", { status: "inactive" }, { id });

    return res.json(new ApiResponse(200, null, "Category deleted"));

  } catch (error) {
    next(error);
  }
};
