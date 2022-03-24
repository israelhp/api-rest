const router = require('express').Router(),
  user = require('./user'),
  profile = require('./profile'),
  post = require('./post'),
  conversation = require('./conversation'),
  message = require('./message');

router.use('/users', user);
router.use('/profile', profile);
router.use('/post', post);
router.use('/conversation', conversation);
router.use('/message', message);
router.get('/', async (req, res) => {
  await res
    .status(200)
    .send({ message: 'Estas conectado a la api-rest josue' });
});

module.exports = router;
