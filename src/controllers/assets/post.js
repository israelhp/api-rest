const Post = require('../../models/Post'),
  { createImage } = require('./image');

const createPost = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(302).send({ message: 'No file exists' });
    }
    req.body.location = {
      lat: req.body.lat,
      ing: req.body.ing,
    };
    delete req.body.lat;
    delete req.body.ing;
    req.body.images = await Promise.all(
      req.files.map(async file => {
        const id = await createImage(req.user, file, 3);
        return id;
      }),
    );
    const post = new Post(req.body);
    const dataSave = await post.save();
    return res.status(200).send(dataSave);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};

// TODO: Validar que este logeado, validar si cuenta a buscar es privada si es privada validar si lo sige
const getPostFeed = (req, res) => {
  try {
    req.hola = 1;
    res.status(2);
  } catch (err) {
    return false;
  }
};
module.exports = { createPost, getPostFeed };
