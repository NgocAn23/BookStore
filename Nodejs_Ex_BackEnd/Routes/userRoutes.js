const express = require('express');
const routes = express.Router();
const userController = require('../Controllers/userController');


routes.get('/users',userController.getAllUsers);
routes.post('/updateUser', userController.updateUser);
routes.post('/deleteUser',userController.deleteUser);


module.exports = routes;