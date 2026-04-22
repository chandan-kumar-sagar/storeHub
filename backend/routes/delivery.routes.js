// Delivery routes
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roleCheck");

const deliveryController = require("../controllers/delivery/delivery.controller");
const orderController = require("../controllers/delivery/order.controller");

//  Delivery only routes
router.get("/getAssignedOrders", auth, allowRoles("delivery"), orderController.getAssignedOrders);
router.put("/acceptOrder/:id/accept", auth, allowRoles("delivery"), orderController.acceptOrder);
router.put("/updateDeliveryStatus/:id/status", auth, allowRoles("delivery"), orderController.updateDeliveryStatus);

module.exports = router;
