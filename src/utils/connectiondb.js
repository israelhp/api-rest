require('dotenv').config();
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URL, options)
  .then(() => {
    console.log(
      `Successful connection to MongoDB server on port: ${process.env.MONGO_URL} `,
    );
  })
  .catch(err => {
    console.log(`Error trying to connect to MongoDB server: ${err}`);
  });
