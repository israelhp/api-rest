const mongoose = require('mongoose'),
  { Schema } = mongoose;

const followingSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  userFollowing: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Following', followingSchema);
