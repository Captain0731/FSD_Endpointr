const Cart = require("../models/Cart");

// GET /cart/:userId
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "items.product",
      "name price image"
    );
    if (!cart) return res.json({ user: req.params.userId, items: [] });
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// POST /cart/:userId — add item to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      cart = await Cart.create({
        user: req.params.userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const idx = cart.items.findIndex(
        (i) => i.product.toString() === productId
      );
      if (idx > -1) {
        cart.items[idx].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

// PUT /cart/:userId/:productId — update quantity
exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId
    );
    if (!item) return res.status(404).json({ error: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// DELETE /cart/:userId/:productId — remove item
exports.removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// DELETE /cart/:userId — clear cart
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};
