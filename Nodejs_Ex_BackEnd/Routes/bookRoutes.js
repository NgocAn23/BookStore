const express = require('express');
const routes = express.Router();
const bookController = require('../Controllers/bookController');

routes.get('/allBooks',bookController.getAllBook);
routes.post('/addBook', bookController.addBook);

// Endpoint sửa thông tin sách
 routes.put('/updateBook/:book_id', bookController.updateBook);

// // Endpoint xóa sách
 routes.delete('/deleteBook/:book_id', bookController.deleteBook);
 // Endpoint tìm kiếm theo tên
routes.get('/search', bookController.searchBookByTitle);
// Endpoint tìm kiếm sách theo category
routes.get('/searchCategory', bookController.searchBookByCategory); 
module.exports = routes; 



