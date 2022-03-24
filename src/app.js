require('dotenv').config();
const cors = require('cors'),
  path = require('path'),
  express = require('express'),
  app = express(),
  router = require('./routes/router');
var a = 10
app.set('port', process.env.PORT);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api-rest', router);
module.exports = app;
