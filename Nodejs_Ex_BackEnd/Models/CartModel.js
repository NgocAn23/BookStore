const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [{
        book_id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    
    total: {
        type:Number
    },
    user_id:{
       type:String,
       required:true  
    }
    
}, {
    versionKey: false, // Vô hiệu hóa `__v`
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;