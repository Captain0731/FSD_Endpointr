const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartcontroller');
const validateRequest = require('../middleware/validation');

const cartAddSchema = {
    userId: { type: 'string', required: true },
    productId: { type: 'number', required: true },
    quantity: { type: 'number', required: true }
};

router.get('/', cartController.getCart);
router.post('/add', validateRequest(cartAddSchema), cartController.addToCart);
router.post('/remove', cartController.removeFromCart);

module.exports = router;
