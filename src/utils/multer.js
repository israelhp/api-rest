const multer = require('multer'),
  path = require('path'),
  { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'imgProfile') {
      cb(null, 'uploads/profile');
    }
    if (file.fieldname === 'imgHeader') {
      cb(null, 'uploads/header');
    }
    if (file.fieldname === 'imgsPost') {
      cb(null, 'uploads/post');
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `${req.user.username}-${uuidv4()}${path.extname(file.originalname)}`,
    );
  },
});

module.exports = multer({ storage });
