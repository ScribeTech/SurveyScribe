const db = require('../database.js');

const Schema = db.Schema;

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

module.exports = db.model('Survey', SurveySchema);
