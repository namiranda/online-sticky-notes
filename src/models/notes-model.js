const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
});

noteSchema.statics.latest = (count) => {
  return noteModel.find({}).sort({ _id: 'desc' }).limit(count);
};

const noteModel = mongoose.model('Note', noteSchema);

module.exports = mongoose.model('Note', noteSchema);
