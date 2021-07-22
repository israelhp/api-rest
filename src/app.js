require('dotenv').config();
const cors = require('cors'),
  express = require('express'),
  app = express(),
  router = require('./routes/router');

app.set('port', process.env.PORT);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api-rest', router);
module.exports = app;
