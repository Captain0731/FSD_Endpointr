// In-memory order data
let orders = [];

exports.placeOrder = (req, res) => {
    const { userId, items, totalAmount } = req.body;

    const newOrder = {
        id: orders.length + 1,
        userId,
        items,
        totalAmount,
        status: 'pending',
        createdAt: new Date()
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
};

exports.getOrderHistory = (req, res) => {
    const userId = req.query.userId;
    const userOrders = orders.filter(o => o.userId === userId);
    res.json(userOrders);
};
