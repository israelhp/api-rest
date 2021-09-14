const mongoose = require('mongoose'),
  Comment = require('../../models/Comment');

/*
  type:
    1 - comment father
    2 - comment son
*/
const newComment = async (req, res) => {
  let status = 0;
  try {
    req.body.user = req.user._id;
    req.body.type = req.body.fatherComment ? 2 : 1;
    const comment = new Comment(req.body);
    const aux = await comment.save();

    if (aux) {
      status = 1;
    }
    return res.status(200).send({ data: { comment: aux }, status });
  } catch (err) {
    return res
      .status(500)
      .send({ data: { message: 'Internal server error' }, status });
  }
};

// TODO: Adjuntar IMG - profile
const getCommentFathers = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: mongoose.Types.ObjectId(req.params.post),
    })
      .populate('user', ['username'])
      .skip(Number.parseInt(req.params.skip, 10))
      .limit(Number.parseInt(req.params.limit, 10));

    const commentsData = await Promise.all(
      comments.map(async comment => {
        const countSon = await Comment.find({
          fatherComment: comment._id,
          type: 2,
        }).count();
        const aux = {
          comment,
          numChildren: countSon,
        };
        return aux;
      }),
    );
    return res.status(200).send({ data: { commentsData }, status: 1 });
  } catch (err) {
    return res
      .status(500)
      .send({ data: { message: 'Internal server error' }, status: 0 });
  }
};

// TODO: Adjuntar IMG - profile
const getCommentChildren = async (req, res) => {
  try {
    const commentChildrens = await Comment.find({
      fatherComment: req.params.fatherComment,
      type: 2,
    })
      .populate('user', ['username'])
      .skip(Number.parseInt(req.params.skip, 10))
      .limit(Number.parseInt(req.params.limit, 10));
    return res.status(200).send({ data: { commentChildrens }, status: 1 });
  } catch (err) {
    return res
      .status(500)
      .send({ data: { message: 'Internal server error' }, status: 0 });
  }
};

module.exports = { newComment, getCommentFathers, getCommentChildren };
