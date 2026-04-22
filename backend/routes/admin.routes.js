// Admin routes
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roleCheck");

const productController = require("../controllers/admin/product.controller");
const categoryController = require("../controllers/admin/category.controller");
const orderController = require("../controllers/admin/order.controller");


//  Admin only routes
router.post("/createProduct", auth, allowRoles("admin"), productController.createProduct);
router.get("/getAllProducts", auth, allowRoles("admin"), productController.getAllProducts);
router.put("/updateProduct/:id", auth, allowRoles("admin"), productController.updateProduct);
router.delete("/deleteProduct/:id", auth, allowRoles("admin"), productController.deleteProduct);


// Category Routes
router.post("/createCategory", auth, allowRoles("admin"), categoryController.createCategory);
router.get("/getAllCategories", auth, allowRoles("admin"), categoryController.getAllCategories);
router.put("/updateCategory/:id", auth, allowRoles("admin"), categoryController.updateCategory);
router.delete("/deleteCategory/:id", auth, allowRoles("admin"), categoryController.deleteCategory);

// Order Routes
router.get("/getAllOrders", auth, allowRoles("admin"), orderController.getAllOrders);
router.get("/getOrderDetails/:id", auth, allowRoles("admin"), orderController.getOrderDetails);
router.put("/updateOrderStatus/:id", auth, allowRoles("admin"), orderController.updateOrderStatus);


module.exports = router;
