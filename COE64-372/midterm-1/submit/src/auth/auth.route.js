const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
const { requireAuth } = require('../middleware/auth');

const authController = new AuthController();

// POST /auth/login
router.post('/login', (req, res) => authController.login(req, res));

// GET /auth/verify - protected route to test token
router.get('/verify', requireAuth, (req, res) => authController.verify(req, res));

// POST /auth/logout - protected route to logout
router.post('/logout', requireAuth, (req, res) => authController.logout(req, res));

module.exports = router;
