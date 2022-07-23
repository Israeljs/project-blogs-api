const express = require('express');
const authCheck = require('../middlewares/authCheck');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', authCheck, categoryController.addCategory);
router.get('/', authCheck, categoryController.getCategories);

module.exports = router;
