// CartRoutes.js
const express = require('express');
const routes = express.Router();
const cartController = require('../Controllers/CartController');

routes.post('/add', cartController.addToCart);
routes.put('/increase', cartController.increaseQuantity);
routes.put('/decrease', cartController.decreaseQuantity);
routes.delete('/remove', cartController.removeFromCart);
//lấy giỏ hàng theo `user_id`
routes.get('/getCart/:user_id', cartController.getCartByUserId);
module.exports = routes;