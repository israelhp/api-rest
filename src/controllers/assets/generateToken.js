require('dotenv').config();
require('../../models/User');
const jwt = require('jsonwebtoken');

const generateToken = async user => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  // eslint-disable-next-line no-param-reassign
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

module.exports = generateToken;
