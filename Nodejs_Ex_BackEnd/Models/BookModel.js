
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_id: {
        type: String,
        unique: true, // Đảm bảo ID là duy nhất
    },
    title: 
    { type: String,
    required: true 
    },
    author: 
    { 
    type: String, 
    required: true 
    },
    publicationDate:{
    type: Date
    }, 
    price:{
        type: Number,
        required:true 
    },
    description:{
    type: String
    },
    inStock: Boolean,
    category:
    {
    type: String
    } ,
    avatarUrl:{
        type:String
    }
});


// Chỉ định tên collection là "Books"
const Book = mongoose.model('Book', bookSchema, 'Books');
module.exports = Book;
