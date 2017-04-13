const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const options = { discriminatorKey: 'kind' };

const QuestionSchema = Schema({
  title: String,
  required: Boolean
});

const SurveySchema = Schema({
  title: String,
  questions: [QuestionSchema]
}, options);

SurveySchema.path('questions').discriminator('Select', Schema({
  options: [String],
  maxSelection: Number
}), options);

SurveySchema.path('questions').discriminator('Scale', Schema({
  min: Number,
  max: Number,
  labels: [String]
}), options);

SurveySchema.path('questions').discriminator('Text', Schema({
  max: Number
}), options);

SurveySchema.statics.sample = () => ({});

module.exports = mongoose.model('Survey', SurveySchema);
