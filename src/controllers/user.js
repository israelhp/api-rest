const register = require('./assets/register'),
  login = require('./assets/login'),
  { logout, logoutall } = require('./assets/logout'),
  { sendUrlResetPassword, validateReset } = require('./assets/resetPassword');

module.exports = {
  register,
  login,
  logout,
  logoutall,
  sendUrlResetPassword,
  validateReset,
};
