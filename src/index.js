const app = require('./app');
const mongoose = require('mongoose');

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
};
app.listen(app.listen(process.env.PORT), () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});

start();
