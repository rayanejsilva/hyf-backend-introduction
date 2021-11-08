const express = require('express');
const authController = require('../controllers/auth');

const authRoutes = express.Router();

authRoutes.get('/', authController.get);
authRoutes.post('/', authController.post);

module.exports = authRoutes;
