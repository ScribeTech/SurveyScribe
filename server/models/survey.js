require('../config/database.js');
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

SurveySchema.statics.sample = () => ({
  title: 'Example Survey',
  questions: [
    {
      label: 'What is your favorite color?',
      options: [
        { label: 'Red', votes: 0 },
        { label: 'Green', votes: 0 },
        { label: 'Blue', votes: 0 }
      ]
    },
    {
      label: 'Which do you like more?',
      options: [
        { label: 'Dogs' },
        { label: 'Cats' }
      ]
    }
  ]
});

module.exports = mongoose.model('Survey', SurveySchema);
