const bcrypt = require('bcrypt'),
  generateToken = require('./generateToken'),
  User = require('../../models/User');

const findUserAndPassword = async (email, password) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        user = null;
      }
    }
    return user;
  } catch (err) {
    throw new Error('Error - try later');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserAndPassword(email, password);

    if (!user) {
      return res.status(302).send({
        message: 'Login failed! Verify that the information is correct',
      });
    }

    const token = await generateToken(user);
    res.status(200).send({
      token,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

module.exports = login;
