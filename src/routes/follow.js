const router = require('express').Router(),
  followController = require('../controllers/follow'),
  authenticate = require('../middlewares/authenticate');

router.post('/follow', authenticate, followController.follow);
router.get('/followers/:id/:skip/:limit', followController.getFollowers);
router.get('/following/:id/:skip/:limit', followController.getFollowing);
router.get('/numfollowers/:id', followController.getNumFollowers);
router.get('/numfollowing/:id', followController.getNumFollowing);
router.post('/unfollow', authenticate, followController.unfollow);

module.exports = router;
