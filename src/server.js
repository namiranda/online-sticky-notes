const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const workspaceRoutes = require('./routes/workspace-routes');
const handleErrors = require('./middlewares/error-handler');
const { createNote, getNotes, deleteNote } = require('./utils/notes');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['https://stickytopiks.netlify.app'],
  },
});

require('dotenv').config();
app.use(express.json());
app.use(
  cors({
    origin: true,
    origin: process.env.FRONT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.set('trust proxy', 1);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    sameSite: 'none',
    secure: true,
  })
);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  } else {
    next();
  }
});
//ROUTES
app.use(userRoutes);
app.use(handleErrors);
app.use(workspaceRoutes);

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

  io.on('connection', async (client) => {
    console.log('client connected...');

    client.on('new note', async (workspace_id, newNote) => {
      let note = await createNote(workspace_id, newNote);
      io.emit('new note', note);
    });

    client.on('old notes', async (workspace_id) => {
      let allNotes = await getNotes(workspace_id);
      io.emit('old notes', allNotes);
    });

    client.on('delete note', async (workspace_id, note_id) => {
      deleteNote(workspace_id, note_id);
      io.emit('delete note', note_id);
    });
  });

  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
  });
};

module.exports = {
  app,
  start,
};
