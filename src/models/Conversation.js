const mongoose = require('mongoose'),
  { Schema } = mongoose;

const conversationSchema = new Schema({
  members: [{ type: Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
