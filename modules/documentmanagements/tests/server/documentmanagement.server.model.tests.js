'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Documentmanagement = mongoose.model('Documentmanagement');

/**
 * Globals
 */
var user,
  documentmanagement;

/**
 * Unit tests
 */
describe('Documentmanagement Model Unit Tests:', function() {
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
      documentmanagement = new Documentmanagement({
        name: 'Documentmanagement Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return documentmanagement.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      documentmanagement.name = '';

      return documentmanagement.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Documentmanagement.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
