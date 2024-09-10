const router = require('express').Router();
const incomeController = require('../controllers/income.controller');

router.post('/addincome', incomeController.createIncome );
router.get('/getrecentincomes', incomeController.getRecentIncomes );
router.get('/gettotalincome', incomeController.getTotalIncomes );

module.exports = router;