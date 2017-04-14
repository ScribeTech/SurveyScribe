const shortid = require('shortid');

exports.schema = {
  type: String,
  default: shortid.generate
};

// Syntactic Sugar
exports._id = exports.schema;
exports.ObjectId = exports.schema.type;
