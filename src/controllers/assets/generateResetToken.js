require('dotenv').config();
require('../../models/User');
const jwt = require('jsonwebtoken');

const generateResetToken = async user => {
  const token = jwt.sign({ _id: user.email }, process.env.JWT_KEY);
  // eslint-disable-next-line no-param-reassign
  user.tokenReset = token;
  await user.save();
  return token;
};

module.exports = generateResetToken;
