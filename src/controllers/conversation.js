const {
    newConversation,
    getConversationsByUsers,
    getConversationById,
  } = require('./assets/conversation'),
  { newMessage, getMessagesByConversation } = require('./assets/message');

module.exports = {
  newConversation,
  getConversationsByUsers,
  getConversationById,
  newMessage,
  getMessagesByConversation,
};
