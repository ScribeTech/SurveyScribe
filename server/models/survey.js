const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SurveySchema = Schema({
  title: String,
  questions: [{
    label: String,
    options: [{ label: String, value: Number }]
  }]
});

module.exports = mongoose.model('Survey', SurveySchema);
