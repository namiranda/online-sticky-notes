const mongoose = require('mongoose');
const workspaceSchema = require('./workspace-model').schema;
const Password = require('../utils/password');

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    workspaces: [workspaceSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

module.exports = mongoose.model('User', userSchema);
