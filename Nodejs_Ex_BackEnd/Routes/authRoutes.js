const express = require('express');
const routes = express.Router();
const authController  = require('../Controllers/AuthController');
const userController = require('../Controllers/userController');
// Endpoint đăng  nhập
routes.post('/login', authController.login);

// Endpoint đăng ký của customer
routes.post('/uregister', authController.userRegister)
// EndPoint đăng ký của employee
routes.post('/eregister', authController.employeeRegister)
// EndPoint sửa thông tin
routes.post('/updateUser', userController.updateUser);
//EndPoint xóa người dùng theo id 
routes.post('/deleteUser',userController.deleteUser);
module.exports = routes;
