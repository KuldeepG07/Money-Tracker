const router = require('express').Router();
const userController = require('../controllers/user.controllers');

router.get('/getuser', userController.getUserByEmail);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;