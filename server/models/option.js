const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionSchema = Schema({
  _question: { type: Number, ref: 'Question' },
  label: String
});

module.exports = mongoose.model('Option', OptionSchema);
