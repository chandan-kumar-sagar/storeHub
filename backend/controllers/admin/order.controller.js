// Order controller (Admin)

const { rawQuery, updateData } = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

// 🔹 Get All Orders
// 🔹 Get All Orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await rawQuery(`
      SELECT o.*, u.name AS user_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    return res.json(new ApiResponse(200, orders, "Orders fetched"));

  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    await updateData("orders", { status }, { id });

    return res.json(new ApiResponse(200, null, "Order status updated"));

  } catch (error) {
    next(error);
  }
};


exports.getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const details = await rawQuery(
      `
      SELECT 
        oi.quantity,
        oi.price,
        p.name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
      `,
      [id]
    );

    return res.json(new ApiResponse(200, details, "Order details fetched"));

  } catch (error) {
    next(error);
  }
};

