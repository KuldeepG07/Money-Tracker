const router = require('express').Router();
const expenseController = require('../controllers/expense.controllers');

router.post('/addexpense', expenseController.createExpense );
router.get('/getrecentexpenses', expenseController.getRecentExpenses );

module.exports = router;