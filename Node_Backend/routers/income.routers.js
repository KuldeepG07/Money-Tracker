const router = require('express').Router();
const incomeController = require('../controllers/income.controller');

router.post('/addincome', incomeController.createIncome );

module.exports = router;