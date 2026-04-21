const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../middleware/auth");

//  Controllers
const userController = require("../controllers/user/user.controller");
const cartController = require("../controllers/user/cart.controller");
const orderController = require("../controllers/user/order.controller");



// PRODUCT ROUTES
router.get("/products", userController.getAllProducts);

// CART ROUTES (Protected)
router.post("/cart", auth, cartController.addToCart);
router.get("/cart", auth, cartController.getCart);
router.put("/cart/:id", auth, cartController.updateCartItem);
router.delete("/cart/:id", auth, cartController.removeCartItem);

// ORDER ROUTES (Protected)
router.post("/orders", auth, orderController.placeOrder);
router.get("/orders", auth, orderController.getMyOrders);
router.get("/orders/:id", auth, orderController.getOrderDetails);


module.exports = router;
