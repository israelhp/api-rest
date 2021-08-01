const register = require('./assets/register'),
  login = require('./assets/login'),
  { follow, getFollowers, getFollowing } = require('./assets/follow'),
  unfollow = require('./assets/unfollow'),
  { logout, logoutall } = require('./assets/logout');

module.exports = {
  register,
  login,
  logout,
  logoutall,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
};
