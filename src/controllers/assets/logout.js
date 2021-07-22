require('dotenv').config();

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token,
    );
    await req.user.save();
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err,
    });
  }
};

const logoutall = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err,
    });
  }
};

module.exports = { logout, logoutall };
