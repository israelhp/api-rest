const multer = require('multer'),
  path = require('path'),
  { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'imgProfile') {
      cb(null, path.resolve('uploads/profile'));
    }
    if (file.fieldname === 'imgHeader') {
      cb(null, path.resolve('uploads/header'));
    }
    if (file.fieldname === 'imgPost') {
      cb(null, path.resolve('uploads'));
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `${req.user.username}-${uuidv4()}.${path.extname(file.originalname)}`,
    );
  },
});

module.exports = multer({ storage });
