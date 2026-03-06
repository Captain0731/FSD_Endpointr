const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { validateRequired, validateObjectId } = require("../middleware/validate");

// POST /orders — create order (with validation)
router.post(
  "/",
  validateRequired(["user", "items", "totalAmount"]),
  orderController.createOrder
);

// GET /orders — get all orders
router.get("/", orderController.getAllOrders);

// GET /orders/:id — get order by id
router.get("/:id", validateObjectId("id"), orderController.getOrderById);

// PUT /orders/:id — update order
router.put("/:id", validateObjectId("id"), orderController.updateOrder);

// DELETE /orders/:id — delete order
router.delete("/:id", validateObjectId("id"), orderController.deleteOrder);

module.exports = router;
