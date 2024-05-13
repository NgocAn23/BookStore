const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        unique: true, // ID là duy nhất
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Ngày lập đơn hàng, mặc định là ngày hiện tại
    },
    user_id: {
        type: String,
        required: true
    },
    books: [{
        book_id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    address:{
        type: String,
        require: true
    },
    total:{
        type:Number
    },
    order_status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'completed'],
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;