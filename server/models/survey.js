const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionSchema = Schema({
  label: String,
  votes: Number
});

const QuestionSchema = Schema({
  _id: String,
  label: String,
  options: [OptionSchema]
}, { _id: false });

const SurveySchema = Schema({
  title: String,
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Survey', SurveySchema);
