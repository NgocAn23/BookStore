const Cart = require('../Models/CartModel');
const Book = require('../Models/BookModel');




exports.addToCart = async (req, res) => {
  try {
      const { book_id, user_id } = req.body;

      // Kiểm tra xem giỏ hàng của user_id hiện tại đã tồn tại trong cơ sở dữ liệu chưa
      let cart = await Cart.findOne({ user_id });
      if (!cart) {
          // Nếu giỏ hàng của user_id hiện tại chưa tồn tại, tạo mới
          cart = new Cart({
              items: [],
              total: 0,
              user_id
          });
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItemIndex = cart.items.findIndex(item => item.book_id === book_id);
      if (existingItemIndex !== -1) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
          cart.items[existingItemIndex].quantity += 1;
      } else {
          // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng với số lượng là 1
          const book = await Book.findOne({ book_id });
          if (!book) {
              return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
          }
          cart.items.push({ book_id, title: book.title, price: book.price, quantity: 1,avatarUrl:book.avatarUrl });
      }

      // Cập nhật tổng tiền của giỏ hàng
      cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity || 0), 0);

      // Lưu giỏ hàng vào cơ sở dữ liệu
      await cart.save();

      res.json({ message: 'Thêm vào giỏ hàng thành công' });
  } catch (error) {
      res.status(500).send(error.message);
  }
};

exports.increaseQuantity = async (req, res) => {
  try {
      const { book_id, user_id } = req.body;

      // Tìm giỏ hàng của user_id trong cơ sở dữ liệu
      let cart = await Cart.findOne({ user_id });

      // Tìm sản phẩm trong giỏ hàng
      const item = cart.items.find(item => item.book_id === book_id);
      if (!item) {
          return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }

      // Tăng số lượng của sản phẩm lên 1
      item.quantity++;

      // Cập nhật tổng tiền của giỏ hàng
      cart.total += item.price;

      // Lưu giỏ hàng vào cơ sở dữ liệu
      await cart.save();

      res.json({ message: 'Tăng số lượng sản phẩm thành công' });
  } catch (error) {
      res.status(500).send(error.message);
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
      const { book_id, user_id } = req.body;

      // Tìm giỏ hàng của user_id trong cơ sở dữ liệu
      let cart = await Cart.findOne({ user_id });

      // Tìm sản phẩm trong giỏ hàng
      const item = cart.items.find(item => item.book_id === book_id);
      if (!item) {
          return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }

      // Giảm số lượng của sản phẩm đi 1
      if (item.quantity > 1) {
          item.quantity--;

          // Cập nhật tổng tiền của giỏ hàng
          cart.total -= item.price;

          // Lưu giỏ hàng vào cơ sở dữ liệu
          await cart.save();

          res.json({ message: 'Giảm số lượng sản phẩm thành công' });
      } else {
          res.status(400).json({ message: 'Số lượng sản phẩm đã là tối thiểu' });
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
};
exports.removeFromCart = async (req, res) => {
  try {
      const { book_id, user_id } = req.body;

      // Tìm giỏ hàng của user_id trong cơ sở dữ liệu
      let cart = await Cart.findOne({ user_id });

      // Tìm sản phẩm trong giỏ hàng và loại bỏ nó
      const removedItemIndex = cart.items.findIndex(item => item.book_id === book_id);
      if (removedItemIndex !== -1) {
          // Giảm tổng tiền của giỏ hàng
          cart.total -= cart.items[removedItemIndex].price * cart.items[removedItemIndex].quantity;

          // Xóa sản phẩm khỏi giỏ hàng
          cart.items.splice(removedItemIndex, 1);

          // Lưu giỏ hàng vào cơ sở dữ liệu
          await cart.save();

          res.json({ message: 'Xóa khỏi giỏ hàng thành công' });
      } else {
          res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
};
exports.getCartByUserId = async (req, res) => {
    try {
      const { user_id } = req.params; // Lấy `user_id` từ tham số URL
      
      // Tìm giỏ hàng theo `user_id`
      const cart = await Cart.findOne({ user_id });
  
      if (!cart) {
        return res.status(404).json({ message: 'Giỏ hàng không tồn tại cho người dùng này.' });
      }
  
      res.status(200).json(cart); // Trả về giỏ hàng của người dùng
    } catch (error) {
      res.status(500).json({ message: 'Lỗi hệ thống', error: error.message }); // Xử lý lỗi
    }
  };
  