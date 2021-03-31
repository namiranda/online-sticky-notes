const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const userRoutes = require('./components/users/user-routes');
const handleErrors = require('./middlewares/error-handler');

const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

//ROUTES
app.use(userRoutes);
app.use(handleErrors);

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

module.exports = {
  app,
  start,
};
