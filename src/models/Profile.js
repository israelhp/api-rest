const mongoose = require('mongoose'),
  { Schema } = mongoose;

/*
  level
    1 - Public
    2 - Private
*/
const profileSchema = new Schema({
  image: { type: Schema.ObjectId, ref: 'Image' },
  imageHeader: { type: Schema.ObjectId, ref: 'Image' },
  name: String,
  description: String,
  level: {
    type: Number,
    default: 1,
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 8,
  },
  socialLinks: {
    nameLink: String,
    link: String,
  },
  follow: Number,
  following: Number,
  user: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Profile', profileSchema);
