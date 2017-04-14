const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const QuestionSchema = Schema({
  title: String,
  required: Boolean
}, { discriminatorKey: 'kind' });

const SurveySchema = Schema({
  title: String,
  owners: [{ type: ObjectId, ref: 'User' }],
  questions: [QuestionSchema]
});

const Questions = SurveySchema.path('questions');

Questions.discriminator('Select', Schema({
  options: [{ label: String }],
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
