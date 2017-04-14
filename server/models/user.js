const assert = require('assert');
const sodium = require('sodium').api;
const mongoose = require('mongoose');
const { _id } = require('./id.js');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  _id,
  name: { type: String, required: true, index: { unique: true } },
  hash: { type: String, required: true, select: false }
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
UserSchema.methods.verifyPassword = function (plaintext, hash = this.hash) {
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
  const hash = sodium.crypto_pwhash_str(
    Buffer.from(plaintext),
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
  )
  .toString('ascii');
  return hash;
};

UserSchema.statics.sample = () => ({
  name: 'John Doe',
  password: 'CorrectHorseBatteryStaple'
});

module.exports = mongoose.model('User', UserSchema);
