const User = require('../Models/UserModel');


// lấy tất cả danh sách người dùng 
exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});  // Tìm tất cả người dùng trong MongoDB
    res.status(200).json(Users);  // Trả về danh sách người dùng
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách người dùng.' });
  }
};
// sửa thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
      // Lấy user_id và các trường cần cập nhật từ phần body của yêu cầu
      const { user_id, username, password, avatarUrl } = req.body;

      // Kiểm tra xem user_id có được cung cấp và là một chuỗi hay không
      if (!user_id || typeof user_id !== 'string') {
          return res.status(400).json({ message: 'Yêu cầu phải chứa user_id dưới dạng chuỗi' });
      }

      // Tìm user trong cơ sở dữ liệu dựa trên user_id
      const user = await User.findOne({ user_id });

      // Kiểm tra xem user có tồn tại hay không
      if (!user) {
          return res.status(404).json({ message: 'User không tồn tại' });
      }

      // Thực hiện cập nhật thông tin user nếu có
      if (username) user.username = username;
      if (password) user.password = password;
      if (avatarUrl) user.avatarUrl = avatarUrl;

      // Lưu thông tin user đã cập nhật vào cơ sở dữ liệu
      await user.save();

      // Trả về thông báo thành công
      res.json({ message: 'Cập nhật thông tin user thành công' });
  } catch (error) {
      // Trả về lỗi nếu có lỗi xảy ra
      res.status(500).send(error.message);
  }
};
// xóa người dùng theo user_id
exports.deleteUser = async (req, res) => {
  try {
      // Lấy user_id từ phần body của yêu cầu
      const { user_id } = req.body;

      // Kiểm tra xem user_id có được cung cấp và là một string hay không
      if (!user_id || typeof user_id !== 'string') {
          return res.status(400).json({ message: 'Yêu cầu phải chứa user_id dưới dạng chuỗi' });
      }

      // Tìm kiếm và xóa người dùng dựa trên user_id
      const deletedUser = await User.findOneAndDelete({ user_id });

      // Kiểm tra xem có người dùng được xóa không
      if (!deletedUser) {
          return res.status(404).json({ message: 'Không tìm thấy người dùng để xóa' });
      }

      // Trả về thông báo thành công
      res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
      // Trả về lỗi nếu có lỗi xảy ra
      res.status(500).send(error.message);
  }
};
