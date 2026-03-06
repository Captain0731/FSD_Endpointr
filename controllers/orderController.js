const Order = require("../models/Order");

// POST /orders
exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// GET /orders (optional ?user= filter)
exports.getAllOrders = async (req, res, next) => {
  try {
    const filter = req.query.user ? { user: req.query.user } : {};
    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.product", "name price");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// GET /orders/:id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// PUT /orders/:id
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// DELETE /orders/:id
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
