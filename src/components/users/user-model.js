const mongoose = require('mongoose');
const Password = require('./utils/password');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

module.exports = mongoose.model('User', userSchema);
