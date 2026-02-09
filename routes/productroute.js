const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const validateRequest = require('../middleware/validation');

const productSchema = {
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    description: { type: 'string', required: false }
};

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateRequest(productSchema), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
