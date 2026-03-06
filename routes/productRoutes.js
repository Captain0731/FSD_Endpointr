const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateRequired, validatePositiveNumber, validateObjectId } = require("../middleware/validate");

// POST /products — create product (with validation)
router.post(
  "/",
  validateRequired(["name", "price", "category"]),
  validatePositiveNumber(["price", "stock"]),
  productController.createProduct
);

// GET /products — get all products
router.get("/", productController.getAllProducts);

// GET /products/:id — get product by id
router.get("/:id", validateObjectId("id"), productController.getProductById);

// PUT /products/:id — update product
router.put(
  "/:id",
  validateObjectId("id"),
  validatePositiveNumber(["price", "stock"]),
  productController.updateProduct
);

// DELETE /products/:id — delete product
router.delete("/:id", validateObjectId("id"), productController.deleteProduct);

module.exports = router;
