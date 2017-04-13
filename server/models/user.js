const assert = require('assert');
const mongoose = require('mongoose');
const sodium = require('sodium').api;

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true, index: { unique: true } },
  hash: { type: Buffer, required: true, select: false }
});

// Hash plaintext passwords before storing
// NOTE: this function will not work as an arrow function
UserSchema.virtual('password')
  .set(function (plaintext) {
    assert.ok(typeof plaintext === 'string', 'Password must be a string');
    assert.ok(this.isNew && plaintext, 'Password is required');
    assert.ok(plaintext.length >= 8, 'Password should be 8 characters or longer');
    this.hash = this.hashPassword(plaintext);
  });
  /* .get()
   * /!\ DANGER /!\
   * There should never be a function to get plaintext passwords. The
   * application should never store plaintext passwords under any circumstances.
   * Period. In the event of a breach, we want to protect user's data and make
   * an attacker's life as miserable as possible.
   */

// Test if the user entered the correct password. Use this function at log in.
// NOTE: this function will not work as an arrow function
UserSchema.methods.authenticate = function (plaintext, hash = this.hash) {
  /* /!\ DANGER /!\
   * Only use this function to compare password hashes. Do not use `===` or
   * `Buffer.comopare()` because both leak information about the correct
   * password. For more information, see:
   * ["Timing Attack"](https://en.wikipedia.org/wiki/Timing_attack)
   */
  return sodium.crypto_pwhash_str_verify(
    Buffer.from(hash),
    Buffer.from(plaintext)
  );
};

// Hash plain text passwords using Argon2i. Sodium automatically adds salt.
UserSchema.methods.hashPassword = function (plaintext) {
  return sodium.crypto_pwhash_str(
    Buffer.from(plaintext),
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
  );
};

UserSchema.statics.sample = () => ({
  name: 'John Doe',
  password: 'password12345678'
});

module.exports = mongoose.model('User', UserSchema);
