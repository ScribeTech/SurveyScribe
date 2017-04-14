const { expect } = require('chai');
const User = require('mongoose').model('User');

describe('User Model', () => {
  beforeEach((done) => {
    User.remove({}, done); // Empty the database to ensure predictablility
  });

  afterEach((done) => {
    User.remove({}, done); // Empty the database to ensure predictablility
  });

  describe('.hashPassword', () => {
    it('is a function', () => {
      expect(User.schema.methods.hashPassword).to.be.a('function');
    });

    it('returns a hash', () => {
      const password = 'CorrectHorseBatteryStaple';
      const actual = User.schema.methods.hashPassword(password);
      expect(actual).to.be.a('string');
      expect(actual.length).to.equal(128);
      expect(actual).to.contain('$argon2i');
    });

    it('does not return the plain text password', () => {
      const password = 'CorrectHorseBatteryStaple';
      expect(User.schema.methods.hashPassword(password)).to.not.equal(password);
    });
  });

  describe('.verifyPassword', () => {
    it('is a function', () => {
      expect(User.schema.methods.verifyPassword).to.be.function;
    });

    it('returns true if the password matches and false if it doesn\'t', (done) => {
      const expected = User.sample();
      const mistmatch = 'qwerty';
      User.create(expected)
      .then(user => User.findById(user._id, '_id name hash').exec())
      .then((user) => {
        expect(user.verifyPassword(expected.password)).to.be.true;
        expect(user.verifyPassword(mistmatch)).to.be.false;
        done();
      })
      .catch(done); // immediately output errors instead of timing out
    });
  });

  describe('.create', () => {
    it('is a function', () => {
      expect(User.create).to.be.function;
    });

    it('only saves password hashes', (done) => {
      const expected = User.sample();
      User.create(expected)
      .then((user) => {
        expect(user.password).to.be.undefined;
        expect(user.hash).to.exist;
        expect(user.hash).to.be.a('string');
        expect(user.verifyPassword(expected.password, user.hash));
        done();
      })
      .catch(done); // immediately output errors instead of timing out
    });

    xit('rejects passwords shorter than 8 characters');
    xit('allows very long passwords');
    xit('allows uncommon symbols');
    xit('does not directly update password hashes');
  });

  describe('.findOne (and .find)', (done) => {
    it('should not return password hashes unless specifically requested', () => {
      const name = 'testuser@testing.com';
      const password = 'CorrectHorseBatteryStaple';
      User.create({ name, password })
      .then(() => User.find({}))
      .then((user) => { expect(user.hash).to.not.exist; })
      .then(() => User.findOne({}, 'name hash'))
      .then((user) => { expect(user.hash).to.exist; })
      .catch(done); // immediately output errors instead of timing out
    });
  });
});
