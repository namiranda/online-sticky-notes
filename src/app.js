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
    // secure: true,
  })
);

//ROUTES
app.use(userRoutes);
app.use(handleErrors);

module.exports = app;
