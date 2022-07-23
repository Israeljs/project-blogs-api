const express = require('express');
const authCheck = require('../middlewares/authCheck');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', authCheck, userController.getUsers);
router.get('/:id', authCheck, userController.getUserById);
router.delete('/me', authCheck, userController.removeMe);

module.exports = router;
