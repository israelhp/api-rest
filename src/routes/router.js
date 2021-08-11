const router = require('express').Router(),
  user = require('./user'),
  profile = require('./profile');

router.use('/users', user);
router.use('/profile', profile);
router.get('/', async (req, res) => {
  await res.status(200).send({ message: 'Estas conectado a la api-rest' });
});

module.exports = router;
