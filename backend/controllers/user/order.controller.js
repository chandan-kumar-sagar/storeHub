// Order controller
const {
  getData,
  insertData,
  rawQuery,
} = require("../../utils/dbHelper");

const { getConnection } = require("../../config/db");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

exports.placeOrder = async (req, res, next) => {
  const connection = await getConnection();

  try {
    const userId = req.user.id;
    const { address_id, payment_method } = req.body;

    //  START TRANSACTION
    await connection.beginTransaction();

    //  Get cart
    const [cart] = await connection.query(
      "SELECT * FROM cart WHERE user_id = ?",
      [userId]
    );

    if (!cart.length) throw new Error("Cart not found");

    const cartId = cart[0].id;

    //  Get cart items
    const [cartItems] = await connection.query(
      "SELECT * FROM cart_items WHERE cart_id = ?",
      [cartId]
    );

    if (!cartItems.length) throw new Error("Cart empty");

    let totalAmount = 0;

    //  CHECK STOCK + CALCULATE
    for (let item of cartItems) {
      const [product] = await connection.query(
        "SELECT stock FROM products WHERE id = ?",
        [item.product_id]
      );

      if (!product.length) throw new Error("Product not found");

      if (product[0].stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      totalAmount += item.price * item.quantity;
    }

    // CREATE ORDER
    const [orderResult] = await connection.query(
      `INSERT INTO orders 
       (user_id, address_id, total_amount, payment_method, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [userId, address_id, totalAmount, payment_method]
    );

    const orderId = orderResult.insertId;

    // INSERT ORDER ITEMS + REDUCE STOCK
    for (let item of cartItems) {
      await connection.query(
        `INSERT INTO order_items 
         (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );

      //  Reduce stock
      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    //  PAYMENT ENTRY
    await connection.query(
      `INSERT INTO payments 
       (order_id, payment_method, amount, status)
       VALUES (?, ?, ?, 'pending')`,
      [orderId, payment_method, totalAmount]
    );

    //  CLEAR CART
    await connection.query(
      "DELETE FROM cart_items WHERE cart_id = ?",
      [cartId]
    );

    //  COMMIT
    await connection.commit();

    return res.json(
      new ApiResponse(200, { orderId }, "Order placed successfully")
    );

  } catch (error) {
    //  ROLLBACK
    await connection.rollback();
    next(new ApiError(400, error.message || "Order failed"));

  } finally {
    connection.release();
  }
};


exports.getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await getData("orders", { user_id: userId });

    return res.json(new ApiResponse(200, orders, "Orders fetched"));

  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const orderItems = await rawQuery(
      `
      SELECT 
        oi.quantity,
        oi.price,
        p.name,
        p.image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
      `,
      [id]
    );

    return res.json(new ApiResponse(200, orderItems, "Order details fetched"));

  } catch (error) {
    next(error);
  }
};

