const mongoose = require('mongoose'),
  Message = require('../../models/Message');

const newMessage = async (req, res) => {
  try {
    req.body.sender = req.user._id;
    const message = new Message(req.body);
    const aux = await message.save();
    if (!aux) {
      return res.status(302).send({ data: { message: aux, error: 'error' } });
    }
    return res.status(200).send({ data: message });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      complete: false,
      err: err.message,
    });
  }
};

const getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: mongoose.Types.ObjectId(req.params.conversation),
    });
    return res.status(302).send({ data: { messages } });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      complete: false,
      err: err.message,
    });
  }
};

module.exports = { newMessage, getMessagesByConversation };
