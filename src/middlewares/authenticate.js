require('dotenv').config();
const jwt = require('jsonwebtoken'),
  User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_KEY);
  try {
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).send({
        message: 'You are not authorized to access this resource.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal server error.',
    });
  }
};

module.exports = authenticate;
