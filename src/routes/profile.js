const router = require('express').Router(),
  upload = require('../utils/multer'),
  profileController = require('../controllers/profile'),
  authenticate = require('../middlewares/authenticate');

router.post(
  '/',
  authenticate,
  upload.fields([
    { name: 'imgProfile', maxCount: 1 },
    { name: 'imgHeader', maxCount: 1 },
  ]),
  profileController.initProfile,
);
router.get('/:id', profileController.getProfile);
module.exports = router;
