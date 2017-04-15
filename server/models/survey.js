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

SurveySchema.statics.sample = () => ({
  owners: [
    'H1J73vRal',
    'rydkXhwRTx',
    'H1N7hw06g'
  ],
  title: 'Example Survey',
  questions: [
    {
      type: 'Scale',
      required: false,
      title: 'How much do you like burritos?',
      min: 0,
      max: 10,
      labels: ['Not at All', 'Somewhat', 'Extremely']
    },
    {
      type: 'Text',
      required: false,
      title: 'Explain your rating.',
      max: 1000
    },
    {
      type: 'Select',
      required: false,
      title: 'What is your favorite color?',
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
