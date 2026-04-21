// Order controller
const {
  getData,
  insertData,
  rawQuery,
} = require("../../utils/dbHelper");

const { getConnection } = require("../../config/db");

exports.placeOrder = async (req, res) => {
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

    res.json({
      message: "Order placed successfully",
      orderId,
    });

  } catch (error) {
    //  ROLLBACK
    await connection.rollback();

    console.error(error);

    res.status(400).json({
      message: error.message || "Order failed",
    });

  } finally {
    connection.release();
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await getData("orders", { user_id: userId });

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrderDetails = async (req, res) => {
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

    res.json({
      success: true,
      data: orderItems,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

