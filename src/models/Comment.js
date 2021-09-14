const mongoose = require('mongoose'),
  { Schema } = mongoose;
/*
  type:
    1 - comment father
    2 - comment son
*/
const commentSchema = new Schema({
  type: Number,
  content: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  post: { type: Schema.ObjectId, ref: 'Post' },
  fatherComment: { type: Schema.ObjectId, ref: 'Comment' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
