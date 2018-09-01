'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Gallerymanagement = mongoose.model('Gallerymanagement');

/**
 * Globals
 */
var user,
  gallerymanagement;

/**
 * Unit tests
 */
describe('Gallerymanagement Model Unit Tests:', function() {
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
      gallerymanagement = new Gallerymanagement({
        name: 'Gallerymanagement Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return gallerymanagement.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      gallerymanagement.name = '';

      return gallerymanagement.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Gallerymanagement.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
