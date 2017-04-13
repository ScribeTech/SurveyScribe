const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const options = { discriminatorKey: 'kind' };

const AnswerSchema = Schema({
  question: { type: ObjectId, ref: 'Survey.questions' }
}, options);

const ResponseSchema = Schema({
  survey: { type: ObjectId, ref: 'Survey' },
  answers: [AnswerSchema]
}, options);

ResponseSchema.path('answers').discriminator('Select', Schema({
  value: [{ type: ObjectId, ref: 'Survey.questions.options' }]
}), options);

ResponseSchema.path('answers').discriminator('Text', Schema({
  value: String
}), options);

ResponseSchema.path('answers').discriminator('Scale', Schema({
  value: Number
}), options);

module.exports = mongoose.model('Response', ResponseSchema);
