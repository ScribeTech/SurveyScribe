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
  owners: [{ type: ObjectId, ref: 'User', required: true }],
  questions: [QuestionSchema]
}, { strict: 'throw' });

const Questions = SurveySchema.path('questions');

Questions.discriminator('Select', Schema({
  _id,
  options: [{ _id, label: String }],
  maxSelection: Number
}));

Questions.discriminator('Scale', Schema({
  _id,
  min: Number,
  max: Number,
  labels: [String]
}));

Questions.discriminator('Text', Schema({
  _id,
  max: Number
}));

SurveySchema.statics.sample = () => ({
  title: 'Example Survey',
  questions: [
    {
      required: false,
      title: 'How much do you like burritos?',
      kind: 'Scale',
      min: 0,
      max: 10,
      labels: ['Not at All', 'Somewhat', 'Extremely']
    },
    {
      required: false,
      title: 'Explain your rating.',
      kind: 'Text',
      max: 1000
    },
    {
      required: false,
      title: 'What is your favorite color?',
      kind: 'Select',
      options: [
        { label: 'Red' },
        { label: 'Green' },
        { label: 'Blue' }
      ],
      maxSelection: 0
    }
  ]
});

module.exports = mongoose.model('Survey', SurveySchema);
