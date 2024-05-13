const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại theo email hay không
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // So sánh mật khẩu trực tiếp
    const isPasswordCorrect = user.password === password;

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo JWT và trả về thông tin người dùng
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi đăng nhập' });
  }
};

//


exports.userRegister = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Tìm user có user_id lớn nhất trong cơ sở dữ liệu cho user
      const lastUser = await User.findOne({ role: "customer" }, {}, { sort: { 'user_id': -1 } });

      let lastuser_id = 0;
      if (lastUser && lastUser.user_id) {
          // Lấy số ký tự phía sau ký tự 'US'
          lastuser_id = parseInt(lastUser.user_id.substring(2));
      }

      // Tạo user_id mới cho user
      const newUserRoleId = 'US' + ('0' + (lastuser_id + 1)).slice(-2);

      // Kiểm tra xem email đã tồn tại trong hệ thống chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' });
      }

      const role = "customer"

      // Tạo một user mới với user_id và các thông tin khác
      const newUser = new User({ user_id: newUserRoleId, username, email, password, role });

      // Lưu user vào cơ sở dữ liệu
      await newUser.save();

      // Trả về thông báo thành công và token
      res.json({ message: 'Đăng ký thành công' });
  } catch (error) {
      res.status(500).send(error.message);
  }
};


exports.employeeRegister = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Tìm user có user_id lớn nhất trong cơ sở dữ liệu cho nhân viên
      const lastEmployee = await User.findOne({ role: "employee" }, {}, { sort: { 'user_id': -1 } });

      let lastEmployeeId = 0;
      if (lastEmployee && lastEmployee.user_id) {
          // Lấy số ký tự phía sau ký tự 'EM'
          lastEmployeeId = parseInt(lastEmployee.user_id.substring(2));
      }

      // Tạo user_id mới cho nhân viên
      const newEmployeeId = 'EM' + ('0' + (lastEmployeeId + 1)).slice(-2);

      // Kiểm tra xem email đã tồn tại trong hệ thống chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' });
      }

      const role = "employee"

      // Tạo một user mới với user_id và các thông tin khác
      const newUser = new User({ user_id: newEmployeeId, username, email, password, role });

      // Lưu user vào cơ sở dữ liệu
      await newUser.save();

      // Trả về thông báo thành công và token
      res.json({ message: 'Đăng ký thành công' });
  } catch (error) {
      res.status(500).send(error.message);
  }
};