// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful signup
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: User added to firestore
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 */
router.post('/api/auth/signup', authController.signupWithEmailAndPassword);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: 1234567890
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     displayName:
 *                       type: string
 *                       example: John Doe
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 */
router.post('/api/auth/login', authController.loginWithEmailAndPassword);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Sign-in with Google
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: ya29.a0AfH6SMDP...
 *     responses:
 *       200:
 *         description: Successful Google sign-in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   example: 1234567890
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 picture:
 *                   type: string
 *                   example: https://example.com/photo.jpg
 *                 iss:
 *                   type: string
 *                   example: https://securetoken.google.com/your-project-id
 *                 aud:
 *                   type: string
 *                   example: your-project-id
 *                 auth_time:
 *                   type: integer
 *                   example: 1599522070
 *                 user_id:
 *                   type: string
 *                   example: abcdef123456
 *                 sub:
 *                   type: string
 *                   example: abcdef123456
 *                 iat:
 *                   type: integer
 *                   example: 1599522070
 *                 exp:
 *                   type: integer
 *                   example: 1599525670
 *                 email_verified:
 *                   type: boolean
 *                   example: true
 *                 firebase:
 *                   type: object
 *                   properties:
 *                     identities:
 *                       type: object
 *                       properties:
 *                         google.com:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["1234567890"]
 *                         email:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["user@example.com"]
 *                     sign_in_provider:
 *                       type: string
 *                       example: google.com
 *       400:
 *         description: Invalid Google token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid Google token
 */
router.post('/api/auth/google', authController.signinWithGoogle);

module.exports = router;
