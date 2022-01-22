require('dotenv').config();
const nodemailer = require('nodemailer'),
  bcrypt = require('bcrypt'),
  validatePass = require('../../utils/validatePass'),
  User = require('../../models/User'),
  generateResetToken = require('./generateResetToken');

const sendUrlResetPassword = async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (user === null) throw new Error();

    const token = await generateResetToken(user);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    const mailOptions = {
      from: process.env.SEND_EMAIL,
      to: `${user.email}`,
      subject: 'Password recovery link - Fango',
      text: `Enter the following link to change your password: ${process.env.URL_RESET_PASSWORD}/${user.username}/${token}`,
    };

    const responseSendImail = await transporter.sendMail(mailOptions);

    return res.status(200).send({
      data: {
        message: 'Recovery email was sent successfully',
        accepted: responseSendImail.accepted[0],
      },
    });
  } catch (err) {
    if (user == null)
      return res.status(302).send({
        message: 'There is no user with this email',
      });

    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

const validateReset = async (req, res) => {
  let user;
  try {
    user = await User.findOne({
      username: req.body.username,
      tokenReset: req.body.token,
    });
    if (user === null) throw new Error();
    if (
      req.body.username !== user.username ||
      req.body.token !== user.tokenReset
    )
      throw new Error('Reset your password again');
    if (!validatePass(req.body.password))
      throw new Error('Password does not meet the requirements');

    user.password = await bcrypt.hash(req.body.password, 10);
    user.save();
    return res.status(200).send({ message: user });
  } catch (err) {
    if (user == null) {
      return res.status(302).send({
        message: 'There is no user with this email',
      });
    }

    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

module.exports = { sendUrlResetPassword, validateReset };
