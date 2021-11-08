const express = require('express');
const authController = require('../controllers/register');

const registerRoutes = express.Router();

registerRoutes.get('/', authController.get);
registerRoutes.post('/', authController.post);

module.exports = registerRoutes;
