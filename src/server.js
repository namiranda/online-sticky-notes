const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./components/users/user-routes');
const app = express();

require('dotenv').config();
app.use(bodyPaser.json());

//ROUTES
app.use(userRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_TOKEN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  });
};

module.exports = start;
