const path = require('path'),
  Image = require('../../models/Image');

const createImage = async (user, file, type) => {
  let aux;
  if (file[0]) {
    aux = {
      user: user._id,
      path: file[0].path,
      typeImage: type,
    };
  } else {
    aux = {
      user: user._id,
      path: file.path,
      typeImage: type,
    };
  }

  try {
    const image = new Image(aux);
    const save = await image.save();
    return save._id;
  } catch (err) {
    return false;
  }
};

const defaultImgProfile = async () => {
  try {
    const img = await Image.findOne({ status: 1, typeImage: 1 });
    if (img) {
      return img._id;
    }
    const aux = {
      path: `${path.resolve('uploads/profile')}/default-profile.jpg`,
      typeImage: 1,
      status: 1,
    };
    let auxImg = new Image(aux);
    auxImg = await auxImg.save();
    return auxImg._id;
  } catch (err) {
    return 0;
  }
};

const defaultImgHeader = async () => {
  try {
    const img = await Image.findOne({ status: 1, typeImage: 2 });
    if (img) {
      return img._id;
    }
    const aux = {
      path: `${path.resolve('uploads/profile')}/profile-header.jpg`,
      typeImage: 2,
      status: 1,
    };
    let auxImg = new Image(aux);
    auxImg = await auxImg.save();
    return auxImg._id;
  } catch (err) {
    return 0;
  }
};

module.exports = { createImage, defaultImgProfile, defaultImgHeader };
