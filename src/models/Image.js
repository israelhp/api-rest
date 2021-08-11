const mongoose = require('mongoose'),
  { Schema } = mongoose;

/*
  typeImage:
    1 - Profile
    2 - Header
    3 - Post
  status: 1 - Default
*/

const imageSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  path: String,
  typeImage: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: Number,
});

module.exports = mongoose.model('Image', imageSchema);
