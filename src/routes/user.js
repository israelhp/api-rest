const router = require('express').Router(),
  userController = require('../controllers/user'),
  authenticate = require('../middlewares/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authenticate, userController.logout);
router.post('/logoutall', authenticate, userController.logoutall);
router.post('/follow', authenticate, userController.follow);
router.get('/followers/:id/:skip/:limit', userController.getFollowers);
router.get('/following/:id/:skip/:limit', userController.getFollowing);
router.post('/unfollow', authenticate, userController.unfollow);
router.get('/', async (req, res) => {
  await res.status(200).send({
    message: 'users',
    rutes: ['/register', '/login', '/logout', '/logoutall'],
  });
});

module.exports = router;
