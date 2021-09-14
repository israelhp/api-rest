const mongoose = require('mongoose'),
  Like = require('../../models/Like');

const createLike = async (req, res) => {
  let like;
  try {
    like = await Like.findOne({
      post: mongoose.Types.ObjectId(req.body.post),
      user: mongoose.Types.ObjectId(req.user._id),
    });
    if (like) {
      return res.status(302).send({ message: 'You already gave him like' });
    }
    req.body.user = req.user._id;
    like = new Like(req.body);
    await like.save();
    return res.status(200).send(like);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};

const removeLike = async (req, res) => {
  try {
    const like = {
      post: mongoose.Types.ObjectId(req.body.post),
      user: mongoose.Types.ObjectId(req.user._id),
    };

    const remove = await Like.deleteOne(like);

    if (!remove.n) {
      return res.status(200).send({
        message: 'The like has already been removed',
      });
    }
    return res.status(200).send({
      message: 'Successful remove like',
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

const countLike = async (req, res) => {
  try {
    const likes = await Like.find({
      post: mongoose.Types.ObjectId(req.params.post),
    }).count();
    return res.status(200).send({
      numLikes: likes,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

// TODO: adjuntar path del img del perfil
const getLikes = async (req, res) => {
  try {
    const likes = await Like.find({
      post: mongoose.Types.ObjectId(req.params.post),
    })
      .populate('user', ['username', 'name'])
      .skip(Number.parseInt(req.params.skip, 10))
      .limit(Number.parseInt(req.params.limit, 10));

    return res.status(200).send({
      likes,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};
module.exports = { createLike, removeLike, countLike, getLikes };
