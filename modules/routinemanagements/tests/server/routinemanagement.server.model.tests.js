'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Routinemanagement = mongoose.model('Routinemanagement');

/**
 * Globals
 */
var user,
  routinemanagement;

/**
 * Unit tests
 */
describe('Routinemanagement Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      routinemanagement = new Routinemanagement({
        name: 'Routinemanagement Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return routinemanagement.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      routinemanagement.name = '';

      return routinemanagement.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Routinemanagement.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
