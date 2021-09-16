const mongoose = require('mongoose'),
  Conversation = require('../../models/Conversation');

const newConversation = async (req, res) => {
  try {
    req.body.members.push(req.user._id);
    const conversation = new Conversation(req.body);

    const aux = await conversation.save();
    if (!aux) {
      return res.status(302).send({ data: { message: aux, error: 'error' } });
    }
    return res.status(200).send({ data: aux });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      complete: false,
      err: err.message,
    });
  }
};

const getConversationsByUsers = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user._id] },
    });
    return res.status(302).send({ data: conversations });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      complete: false,
      err: err.message,
    });
  }
};

const getConversationById = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      _id: mongoose.Types.ObjectId(req.params.idConversation),
    });
    return res.status(302).send({ data: conversations });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      complete: false,
      err: err.message,
    });
  }
};

module.exports = {
  newConversation,
  getConversationsByUsers,
  getConversationById,
};
