const mongoose = require('mongoose'),
  { Schema } = mongoose;

const followersSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  userFollower: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Follower', followersSchema);
