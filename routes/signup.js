const express = require('express');
const router = express.Router();

const userSignUp = require('../controllers/user_signup_controller');
const createUser = require('../controllers/create_user_controller')


router.get('/', userSignUp.signup);
router.post('/create-user', createUser.create);


module.exports = router;
