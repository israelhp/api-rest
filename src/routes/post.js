const router = require('express').Router(),
  upload = require('../utils/multer'),
  postController = require('../controllers/post'),
  authenticate = require('../middlewares/authenticate');

router.post(
  '/',
  authenticate,
  upload.array('imgsPost'),
  postController.createPost,
);
router.post('/clike', authenticate, postController.createLike);
router.post('/rlike', authenticate, postController.removeLike);
router.post('/newComment', authenticate, postController.newComment);
router.get('/numlikes/:post', postController.countLike);
router.get('/getLikes/:post/:skip/:limit', postController.getLikes);
router.get(
  '/getCommentFathers/:post/:skip/:limit',
  postController.getCommentFathers,
);
module.exports = router;
