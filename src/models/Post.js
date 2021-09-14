const mongoose = require('mongoose'),
  { Schema } = mongoose;

const postSchema = new Schema({
  content: String,
  location: {
    lat: Number,
    ing: Number,
  },
  images: [{ type: Schema.ObjectId, ref: 'Image' }],
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Post', postSchema);
