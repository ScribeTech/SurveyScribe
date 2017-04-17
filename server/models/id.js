const shortid = require('shortid');

exports.schema = {
  type: String,
  unique: true,
  index: true,
  required: true,
  default: shortid.generate,
  validate: { validator: shortid.isValid }
};

// Syntactic Sugar
exports._id = exports.schema;
exports.ObjectId = exports.schema.type;
