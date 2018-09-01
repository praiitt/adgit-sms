'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TeacherStaffmanagement = mongoose.model('TeacherStaffmanagement');

/**
 * Globals
 */
var user,
  teacherStaffmanagement;

/**
 * Unit tests
 */
describe('Teacher staffmanagement Model Unit Tests:', function() {
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
      teacherStaffmanagement = new TeacherStaffmanagement({
        name: 'Teacher staffmanagement Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return teacherStaffmanagement.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      teacherStaffmanagement.name = '';

      return teacherStaffmanagement.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    TeacherStaffmanagement.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
