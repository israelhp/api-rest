const bcrypt = require('bcrypt'),
  User = require('../../models/User'),
  validatePass = require('../../utils/validatePass');

const register = async (req, res) => {
  try {
    if (validatePass(req.body.password)) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      await user.save();
      return res.status(201).send({ message: 'User created successfully' });
    }
    return res.status(400).send({
      message: 'The password does not meet the parameters.',
    });
  } catch (err) {
    if (err.keyPattern) {
      return res.status(302).send({
        err,
        message: `Datos no validos en el campo: ${JSON.stringify(
          err.keyValue,
        )}`,
      });
    }
    return res.status(500).send({
      err,
      message: 'Internal server error.',
    });
  }
};

module.exports = register;
