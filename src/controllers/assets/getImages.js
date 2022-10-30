const Profile = require('../../models/Profile');

const getImgProfile = async (req, res) => {
  let profile;
  try {
    profile = await Profile.findOne({ user: req.user._id }).populate('image');

    if (profile == null) {
      throw new Error('Record does not exist');
    }
    return res.status(200).send({ data: { image: profile.image } });
  } catch (err) {
    if (profile == null) return res.status(302).send({ err: err.message });

    return res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

module.exports = { getImgProfile };
