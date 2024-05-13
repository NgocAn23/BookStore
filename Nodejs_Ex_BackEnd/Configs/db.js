const mongoose = require('mongoose');
const dotenv = require('dotenv');  // Để lấy biến môi trường

dotenv.config();  

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });
    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);  // Dừng ứng dụng nếu không kết nối được
  }
};

module.exports = connectDB;
