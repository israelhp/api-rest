const Followers = require('../../models/Followers'),
  Following = require('../../models/Following'),
  { incrementUnFollowProfile } = require('./followProfile');

const unfollow = async (req, res) => {
  try {
    const dFollower = {
      user: req.body.userUnFollowing._id,
      userFollower: req.user._id,
    };
    const dFollowing = {
      user: req.user._id,
      userFollowing: req.body.userUnFollowing._id,
    };

    const deleteFollower = await Followers.deleteOne(dFollower);
    const deleteFollowing = await Following.deleteOne(dFollowing);
    await incrementUnFollowProfile(req.user._id, req.body.userUnFollowing._id);

    return res.status(500).send({
      message: 'Successful unfollow',
      user: deleteFollower.userFollower,
      userUnFollow: deleteFollowing.user,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

module.exports = unfollow;
