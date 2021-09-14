const router = require('express').Router(),
  user = require('./user'),
  profile = require('./profile'),
  post = require('./post');

router.use('/users', user);
router.use('/profile', profile);
router.use('/post', post);
router.get('/', async (req, res) => {
  await res.status(200).send({ message: 'Estas conectado a la api-rest' });
});

module.exports = router;
