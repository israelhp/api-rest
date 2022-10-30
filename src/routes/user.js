const router = require('express').Router(),
  userController = require('../controllers/user'),
  authenticate = require('../middlewares/authenticate'),
  routerFollow = require('./follow');

router.use('/', routerFollow);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authenticate, userController.logout);
router.post('/logoutall', authenticate, userController.logoutall);
router.post('/reset', userController.sendUrlResetPassword);
router.post('/reset/validate', userController.validateReset);
router.get('/auth/image/profile', authenticate, userController.getImgProfile);
router.get('/', async (req, res) => {
  await res.status(200).send({
    message: 'users',
    rutes: ['/register', '/login', '/logout', '/logoutall'],
  });
});

module.exports = router;
