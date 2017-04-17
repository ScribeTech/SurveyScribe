const mongoose = require('mongoose');
const { _id, ObjectId } = require('./id.js');

const Schema = mongoose.Schema;

const AnswerSchema = Schema({
  _id,
  question: { type: ObjectId, ref: 'Survey.questions' }
}, { discriminatorKey: 'kind' });

const ResponseSchema = Schema({
  _id,
  participant: { type: ObjectId, ref: 'Session.sid', select: false },
    /* /!\ DANGER /!\
     * The 'participant' field stores a sessionID. Be careful how you handle
     * sessionID's because anyone with someone else's sessionID can impersonate
     * that other person! Thus, 'participant' is set to be invisible by default.
     * `{ select: false }`.
     */
  survey: { type: ObjectId, ref: 'Survey', required: true },
  answers: [AnswerSchema]
}, { strict: 'throw' });

const Answers = ResponseSchema.path('answers');

Answers.discriminator('Select', Schema({
  _id,
  value: [{ type: ObjectId, ref: 'Survey.questions.options' }]
}));

Answers.discriminator('Text', Schema({
  _id,
  value: String
}));

Answers.discriminator('Scale', Schema({
  _id,
  value: Number
}));

ResponseSchema.statics.sample = () => ({
  _id,
  survey: 'B1vy7hwCpl',
  answers: [
    {
      kind: 'Scale',
      value: 10
    },
    {
      kind: 'Text',
      value: 'I love them with all my soul!!!'
    },
    {
      kind: 'Select',
      value: ['Sk0RuYzRl']
    }
  ]
});

module.exports = mongoose.model('Response', ResponseSchema);
