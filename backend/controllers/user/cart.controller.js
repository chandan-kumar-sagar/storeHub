// Cart controller

const { rawQuery } = require("../../utils/dbHelper");
const {
  getData,
  insertData,
  updateData,
  deleteData,
} = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");

// 🔹 Add to Cart
// 🔹 Add to Cart
exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    // 1. check product
    const product = await getData("products", {
      id: product_id,
      status: "active",
    });

    if (!product.length) {
      throw new ApiError(404, "Product not found");
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

    return res.json(new ApiResponse(200, null, "Added to cart"));

  } catch (error) {
    next(error);
  }
};


exports.getCart = async (req, res, next) => {
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

    return res.json(new ApiResponse(200, cartItems, "Cart items fetched"));

  } catch (error) {
    next(error);
  }
};


exports.updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      throw new ApiError(400, "Invalid quantity");
    }

    await updateData("cart_items", { quantity }, { id });

    return res.json(new ApiResponse(200, null, "Cart updated"));

  } catch (error) {
    next(error);
  }
};



exports.removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteData("cart_items", { id });

    return res.json(new ApiResponse(200, null, "Item removed"));

  } catch (error) {
    next(error);
  }
};
