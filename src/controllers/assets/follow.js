/*
  Followers count function is in the directory ./util
*/

require('../../models/User');
const Followers = require('../../models/Followers'),
  Following = require('../../models/Following');

const follow = async (req, res) => {
  try {
    if (String(req.body.userFollowing._id) === String(req.user._id)) {
      return res.status(302).send({
        message: 'This person could not be followed',
        complete: true,
      });
    }
    const dFollower = {
      user: req.body.userFollowing._id,
      userFollower: req.user._id,
    };
    const dFollowing = {
      user: req.user._id,
      userFollowing: req.body.userFollowing._id,
    };
    const isFollow = await Followers.findOne(dFollower);
    const isFollowing = await Following.findOne(dFollowing);
    if (isFollow && isFollowing) {
      return res.status(200).send({
        message: 'You already follow that person',
        complete: true,
      });
    }
    const follower = new Followers({
      ...dFollower,
    });
    const following = new Following({
      ...dFollowing,
    });
    following.save();
    follower.save();

    return res.status(200).send({
      message: 'Follow successful',
      complete: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      complete: false,
      err: err.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const followers = await Followers.find(
      { user: req.params.id },
      { userFollower: 1 },
    )
      .skip(Number.parseInt(req.params.skip, 10))
      .limit(Number.parseInt(req.params.limit, 10))
      .populate('userFollower', ['username', 'name']);
    return res.status(200).send({
      followers,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const followers = await Following.find(
      { user: req.params.id },
      { userFollowing: -1 },
    )
      .skip(Number.parseInt(req.params.skip, 10))
      .limit(Number.parseInt(req.params.limit, 10))
      .populate('userFollowing', ['username', 'name']);
    return res.status(200).send({
      followers,
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

module.exports = { follow, getFollowers, getFollowing };
