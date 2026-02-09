// In-memory cart data (simple user-based cart)
let carts = {};

exports.getCart = (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        const error = new Error('UserId is required');
        error.statusCode = 400;
        throw error;
    }

    res.json(carts[userId] || []);
};

exports.addToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!carts[userId]) {
        carts[userId] = [];
    }

    const existingItem = carts[userId].find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts[userId].push({ productId, quantity });
    }

    res.json(carts[userId]);
};

exports.removeFromCart = (req, res) => {
    const { userId, productId } = req.body;

    if (carts[userId]) {
        carts[userId] = carts[userId].filter(item => item.productId !== productId);
    }

    res.json(carts[userId] || []);
};
