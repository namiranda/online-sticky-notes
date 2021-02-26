const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const userRoutes = require('./components/users/user-routes');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

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

  app.listen(app.listen(process.env.PORT), () => {
    console.log(`Listening on port ${process.env.PORT}...`);
  });
};

module.exports = start;
