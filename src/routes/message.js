const router = require('express').Router(),
  conversationControllers = require('../controllers/conversation'),
  authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, conversationControllers.newMessage);
router.get('/:conversation', conversationControllers.getMessagesByConversation);

module.exports = router;
