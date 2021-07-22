const router = require('express').Router(),
  user = require('./user');

router.use('/users', user);
router.get('/', async (req, res) => {
  await res.status(200).send({ message: 'Estas conectado a la api-rest' });
});

module.exports = router;
