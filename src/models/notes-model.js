const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
});

noteSchema.statics.latest = (count) => {
  return noteModel.find({}).sort({ _id: 'desc' }).limit(count);
};

noteSchema.statics.create = (content) => {
  let msg = new noteModel({
    date: new Date(),
    content: content,
  });

  return msg.save();
};

const noteModel = mongoose.model('Note', noteSchema);

module.exports = {
  Schema: noteSchema,
  Model: noteModel,
};
