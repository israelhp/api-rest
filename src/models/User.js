const mongoose = require('mongoose'),
  { Schema } = mongoose,
  validator = require('validator');

const userSchema = new Schema({
  isActive: Boolean,
  isAdmin: Boolean,
  name: {
    first: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Please fill in the name'],
    },
    last: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Please fill in the last name'],
    },
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Please fill in the username'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Please complete the email'],
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ message: 'Invalid email address' });
      }
    },
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  tokenReset: { type: String },
});

module.exports = mongoose.model('User', userSchema);
