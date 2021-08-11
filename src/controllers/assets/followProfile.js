const mongoose = require('mongoose'),
  Profile = require('../../models/Profile');

const incrementFollowProfile = async (idUserAutenticate, idUserOther) => {
  try {
    const profileUserAut = await Profile.findOne({
      user: mongoose.Types.ObjectId(idUserAutenticate),
    });
    const profileUserOth = await Profile.findOne({
      user: mongoose.Types.ObjectId(idUserOther),
    });
    if (profileUserAut && profileUserOth) {
      profileUserAut.following += 1;
      profileUserOth.follow += 1;
      profileUserAut.save();
      profileUserOth.save();
    }
  } catch (err) {
    return false;
  }
  return true;
};

const incrementUnFollowProfile = async (idUserAutenticate, idUserOther) => {
  try {
    const profileUserAut = await Profile.findOne({
      user: mongoose.Types.ObjectId(idUserAutenticate),
    });
    const profileUserOth = await Profile.findOne({
      user: mongoose.Types.ObjectId(idUserOther),
    });
    if (profileUserAut && profileUserOth) {
      profileUserAut.following -= 1;
      profileUserOth.follow -= 1;
      profileUserAut.save();
      profileUserOth.save();
    }
  } catch (err) {
    return false;
  }
  return true;
};

module.exports = { incrementFollowProfile, incrementUnFollowProfile };
