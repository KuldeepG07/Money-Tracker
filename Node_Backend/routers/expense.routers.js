const router = require('express').Router();
const expenseController = require('../controllers/expense.controllers');

router.post('/addexpense', expenseController.createExpense );

module.exports = router;