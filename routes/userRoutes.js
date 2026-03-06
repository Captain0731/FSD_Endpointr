const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateRequired, validateEmail, validateObjectId } = require("../middleware/validate");

// POST /users — create user (with validation)
router.post(
  "/",
  validateRequired(["name", "email", "password"]),
  validateEmail,
  userController.createUser
);

// GET /users — get all users
router.get("/", userController.getAllUsers);

// GET /users/:id — get user by id
router.get("/:id", validateObjectId("id"), userController.getUserById);

// PUT /users/:id — update user
router.put("/:id", validateObjectId("id"), validateEmail, userController.updateUser);

// DELETE /users/:id — delete user
router.delete("/:id", validateObjectId("id"), userController.deleteUser);

module.exports = router;
