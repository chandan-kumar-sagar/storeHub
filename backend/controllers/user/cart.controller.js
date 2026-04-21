// Cart controller

const { rawQuery } = require("../../utils/dbHelper");
const {
  getData,
  insertData,
  updateData,
} = require("../../utils/dbHelper");

// 🔹 Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    // 1. check product
    const product = await getData("products", {
      id: product_id,
      status: "active",
    });

    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. get or create cart
    let cart = await getData("cart", { user_id: userId });

    let cartId;

    if (!cart.length) {
      cartId = await insertData("cart", { user_id: userId });
    } else {
      cartId = cart[0].id;
    }

    // 3. check if item exists
    const existingItem = await getData("cart_items", {
      cart_id: cartId,
      product_id,
    });

    if (existingItem.length) {
      // update quantity
      await updateData(
        "cart_items",
        { quantity: existingItem[0].quantity + quantity },
        { id: existingItem[0].id }
      );
    } else {
      // insert new
      await insertData("cart_items", {
        cart_id: cartId,
        product_id,
        quantity,
        price: product[0].discount_price || product[0].price,
      });
    }

    res.json({ message: "Added to cart" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await rawQuery(
      `
      SELECT 
        ci.id,
        ci.quantity,
        ci.price,
        p.name,
        p.image
      FROM cart_items ci
      JOIN cart c ON ci.cart_id = c.id
      JOIN products p ON ci.product_id = p.id
      WHERE c.user_id = ?
      `,
      [userId]
    );

    res.json({
      success: true,
      data: cartItems,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    await updateData("cart_items", { quantity }, { id });

    res.json({ message: "Cart updated" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



exports.removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteData("cart_items", { id });

    res.json({ message: "Item removed" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
