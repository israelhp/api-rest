const router = require('express').Router(),
  conversationControllers = require('../controllers/conversation'),
  authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, conversationControllers.newConversation);
router.get('/', authenticate, conversationControllers.getConversationsByUsers);
router.get(
  '/find/:idConversation',
  conversationControllers.getConversationById,
);

module.exports = router;
