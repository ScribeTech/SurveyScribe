const mongoose = require('mongoose');
const { _id, ObjectId } = require('./id.js');

const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  _id,
  title: String,
  required: Boolean
}, { discriminatorKey: 'kind' });

const SurveySchema = Schema({
  _id,
  title: String,
  owners: [{ type: ObjectId, ref: 'User' }],
  questions: [QuestionSchema]
}, { strict: 'throw' });

const Questions = SurveySchema.path('questions');

Questions.discriminator('Select', Schema({
  options: [{ _id, label: String }],
  maxSelection: Number
}));

Questions.discriminator('Scale', Schema({
  min: Number,
  max: Number,
  labels: [String]
}));

Questions.discriminator('Text', Schema({
  max: Number
}));

SurveySchema.statics.sample = () => ({});

module.exports = mongoose.model('Survey', SurveySchema);
