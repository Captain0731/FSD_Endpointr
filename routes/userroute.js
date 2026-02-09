const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const validateRequest = require('../middleware/validation');

const userSchema = {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true }
};

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateRequest(userSchema), userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
