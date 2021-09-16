const mongoose = require('mongoose'),
  { Schema } = mongoose;

const messageSchema = new Schema({
  conversation: { type: Schema.ObjectId, ref: 'Conversation' },
  sender: { type: Schema.ObjectId, ref: 'User' },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
