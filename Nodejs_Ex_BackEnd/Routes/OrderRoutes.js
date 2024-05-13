const express = require('express');
const routes = express.Router();
const orderController = require('../Controllers/OrderController');

routes.post('/create', orderController.createOrder);
routes.delete('/cancel', orderController.cancelOrder);

module.exports = routes;