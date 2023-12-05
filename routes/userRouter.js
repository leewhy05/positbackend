const express = require('express');
const { registration, login, getUser, logout } = require('../controller/userController');
const router = express.Router();
const auth = require('../middleware/auth')



// register route

router.post('/register',registration);
router.post('/login',login);
router.get('/user',auth, getUser);
router.post('/logout',logout)

module.exports = router