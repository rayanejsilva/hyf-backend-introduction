const express = require('express');
const registerController = require('../controllers/register');
const registerValidator = require('../middleware/registerValidator');

const registerRoutes = express.Router();

registerRoutes.get('/', registerController.get);
registerRoutes.post('/', registerValidator);
registerRoutes.post('/', registerController.post);

module.exports = registerRoutes;
