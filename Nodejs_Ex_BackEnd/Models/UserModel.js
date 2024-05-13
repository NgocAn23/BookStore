const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id:{
   type: String,
   required: true,
   unique : true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl:{
    type: String,
    default: '',
  } ,
  role: {
    type: String,
    enum: ['admin', 'employee', 'customer'],
    default: 'customer',
  },
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
