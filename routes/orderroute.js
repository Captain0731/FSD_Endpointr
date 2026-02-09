const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');
const validateRequest = require('../middleware/validation');

const orderSchema = {
    userId: { type: 'string', required: true },
    items: { type: 'object', required: true },
    totalAmount: { type: 'number', required: true }
};

router.post('/', validateRequest(orderSchema), orderController.placeOrder);
router.get('/', orderController.getOrderHistory);

module.exports = router;
