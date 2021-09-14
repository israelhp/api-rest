const { createPost } = require('./assets/post'),
  { createLike, removeLike, countLike, getLikes } = require('./assets/like'),
  { newComment, getCommentFathers } = require('./assets/comment');

module.exports = {
  createPost,
  createLike,
  removeLike,
  countLike,
  getLikes,
  newComment,
  getCommentFathers,
};
