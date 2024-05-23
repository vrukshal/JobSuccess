const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {db, auth} = require('../config/firebase')
router.post('/api/auth/signup', authController.signupWithEmailAndPassword);
router.post('/api/auth/login', authController.loginWithEmailAndPassword);
router.post('/api/auth/google', authController.signinWithGoogle);

module.exports = router;