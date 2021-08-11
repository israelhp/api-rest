const mongoose = require('mongoose'),
  Profile = require('../../models/Profile'),
  { createImage, defaultImgProfile, defaultImgHeader } = require('./image'),
  follow = require('./follow');

// TODO: Agregar Perfil inicial en caso no suba fotos. y agregar en caso si sube
const initProfile = async (req, res) => {
  let idImgProfile, idImgHeader;
  try {
    let profile = await Profile.findOne({
      user: mongoose.Types.ObjectId(req.user._id),
    });
    if (req.files.imgProfile) {
      idImgProfile = await createImage(req.user, req.files.imgProfile, 1);
      req.body.image = idImgProfile;
    } else if (!profile) {
      req.body.image = await defaultImgProfile();
    }
    if (req.files.imgHeader) {
      idImgHeader = await createImage(req.user, req.files.imgHeader, 2);
      req.body.imageHeader = idImgHeader;
    } else if (!profile) {
      req.body.imageHeader = await defaultImgHeader();
    }
    req.body.follow = await follow.getNumFollowersObj(req);
    req.body.following = await follow.getNumFollowingObj(req);
    req.body.user = req.user._id;

    if (!profile) {
      profile = new Profile(req.body);
    } else {
      if (idImgProfile) profile.image = idImgProfile;

      if (idImgHeader) profile.imageHeader = idImgHeader;

      if (req.body.name) profile.name = req.body.name;

      if (req.body.description) profile.description = req.body.description;

      if (req.body.level) profile.level = req.body.level;
    }
    await profile.save();

    return res.status(200).send({
      data: {
        name: profile.name,
        description: profile.description,
        images: { idProfile: profile.image, idHeader: profile.imageHeader },
        numFollowers: profile.follow,
        numFollowing: profile.following,
        user: {
          _id: req.user._id,
          username: req.user.username,
        },
        level: profile.level,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: mongoose.Types.ObjectId(req.params.id),
    })
      .populate('image')
      .populate('imageHeader');
    if (!profile) {
      return res.status(404).send({ message: 'There is no such profile' });
    }
    return res.status(200).send({ data: profile });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

module.exports = { initProfile, getProfile };
