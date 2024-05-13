const Order = require('../Models/OrderModel');
const Cart = require('../Models/CartModel');

exports.createOrder = async (req, res) => {
    try {
        const { user_id, address, total, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống' });
        }

        // Tạo một order_id mới
        const orderId = 'ORD' + Date.now();

        // Tạo một đơn hàng mới
        const newOrder = new Order({
            order_id: orderId,
            date: new Date(),
            user_id: user_id,
            books: items.map(item => ({ book_id: item.book_id, quantity: item.quantity })),
            address: address,
            total: total, // Sử dụng giá trị total từ cart
            order_status: 'pending'
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await newOrder.save();

        // Xóa các sản phẩm đã được chọn khỏi giỏ hàng (nếu cần)

        res.json({ message: 'Đã tạo đơn hàng thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.cancelOrder = async (req, res) => {
    try {
        const { order_id } = req.body;

        // Xóa đơn hàng khỏi cơ sở dữ liệu
        await Order.findOneAndDelete({ order_id });

        res.json({ message: 'Đã hủy đơn hàng thành công' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
