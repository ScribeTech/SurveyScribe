const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  _id: String,
  _survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
  type: String,
  label: String,
  options: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
  responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
}, { _id: false });

module.exports = mongoose.model('Question', QuestionSchema);
