const mongoose = require('mongoose');
const { _id, ObjectId } = require('./id.js');

const Schema = mongoose.Schema;

const AnswerSchema = Schema({
  _id,
  question: { type: ObjectId, ref: 'Survey.questions' }
}, { discriminatorKey: 'kind' });

const ResponseSchema = Schema({
  _id,
  participant: { type: String, ref: 'Session.sid', select: false },
    /* /!\ DANGER /!\
     * The 'participant' field stores a sessionID. Be careful how you handle
     * sessionID's because anyone with someone else's sessionID can impersonate
     * that other person! Thus, 'participant' is set to be invisible by default.
     * `{ select: false }`.
     */
  survey: { type: ObjectId, ref: 'Survey' },
  answers: [AnswerSchema]
}, { strict: 'throw' });

const Answers = ResponseSchema.path('answers');

Answers.discriminator('Select', Schema({
  value: [{ type: ObjectId, ref: 'Survey.questions.options' }]
}));

Answers.discriminator('Text', Schema({
  value: String
}));

Answers.discriminator('Scale', Schema({
  value: Number
}));

ResponseSchema.statics.sample = () => ({
  participant: 'H1J73vRal',
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
      value: ['58ee6466aa8ac36d6d74fe9a']
    }
  ]
});

module.exports = mongoose.model('Response', ResponseSchema);
