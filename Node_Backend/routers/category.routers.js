const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.get('/getcategories', categoryController.getAllCategories );

module.exports = router;