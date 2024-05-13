const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/db');  // Đường dẫn đến tệp kết nối MongoDB
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const cartRoutes = require('./Routes/CartRoutes');
const orderRoutes = require('./Routes/OrderRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();  // Gọi hàm kết nối MongoDB

const PORT = process.env.PORT || 4000;

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
