const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { validateRequired, validateObjectId } = require("../middleware/validate");

// GET /cart/:userId — get cart
router.get("/:userId", validateObjectId("userId"), cartController.getCart);

// POST /cart/:userId — add item to cart
router.post(
  "/:userId",
  validateObjectId("userId"),
  validateRequired(["productId"]),
  cartController.addToCart
);

// PUT /cart/:userId/:productId — update item quantity
router.put(
  "/:userId/:productId",
  validateObjectId("userId"),
  validateObjectId("productId"),
  validateRequired(["quantity"]),
  cartController.updateCartItem
);

// DELETE /cart/:userId/:productId — remove item from cart
router.delete(
  "/:userId/:productId",
  validateObjectId("userId"),
  validateObjectId("productId"),
  cartController.removeCartItem
);

// DELETE /cart/:userId — clear entire cart
router.delete("/:userId", validateObjectId("userId"), cartController.clearCart);

module.exports = router;
