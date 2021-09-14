const mongoose = require('mongoose'),
  { Schema } = mongoose;

const likeSchema = new Schema({
  post: { type: Schema.ObjectId, ref: 'Post' },
  user: { type: Schema.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', likeSchema);
