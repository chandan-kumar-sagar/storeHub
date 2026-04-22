// Order controller (Delivery)
const { rawQuery, updateData, insertData } = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

// 🔹 Get Orders for Delivery
// 🔹 Get Orders for Delivery
exports.getAssignedOrders = async (req, res, next) => {
  try {
    const orders = await rawQuery(`
      SELECT o.*, u.name AS customer_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.status IN ('confirmed', 'shipped')
      ORDER BY o.created_at DESC
    `);

    return res.json(new ApiResponse(200, orders, "Assigned orders fetched"));

  } catch (error) {
    next(error);
  }
};


exports.acceptOrder = async (req, res, next) => {
  try {
    const deliveryId = req.user.id;
    const { id } = req.params;

    await updateData(
      "orders",
      {
        delivery_partner_id: deliveryId,
        status: "shipped",
      },
      { id }
    );

    return res.json(new ApiResponse(200, null, "Order accepted for delivery"));

  } catch (error) {
    next(error);
  }
};

exports.updateDeliveryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "shipped",
      "out_for_delivery",
      "delivered",
    ];

    if (!allowed.includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    await updateData("orders", { status }, { id });

    res.json(new ApiResponse(200, null, "Delivery status updated"));

    await insertData("delivery_logs", {
      order_id: id,
      status,
    });

  } catch (error) {
    next(error);
  }
};




