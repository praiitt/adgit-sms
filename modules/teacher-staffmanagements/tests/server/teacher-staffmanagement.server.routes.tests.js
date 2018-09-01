'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TeacherStaffmanagement = mongoose.model('TeacherStaffmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  teacherStaffmanagement;

/**
 * Teacher staffmanagement routes tests
 */
describe('Teacher staffmanagement CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Teacher staffmanagement
    user.save(function () {
      teacherStaffmanagement = {
        name: 'Teacher staffmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Teacher staffmanagement if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Teacher staffmanagement
        agent.post('/api/teacherStaffmanagements')
          .send(teacherStaffmanagement)
          .expect(200)
          .end(function (teacherStaffmanagementSaveErr, teacherStaffmanagementSaveRes) {
            // Handle Teacher staffmanagement save error
            if (teacherStaffmanagementSaveErr) {
              return done(teacherStaffmanagementSaveErr);
            }

            // Get a list of Teacher staffmanagements
            agent.get('/api/teacherStaffmanagements')
              .end(function (teacherStaffmanagementsGetErr, teacherStaffmanagementsGetRes) {
                // Handle Teacher staffmanagements save error
                if (teacherStaffmanagementsGetErr) {
                  return done(teacherStaffmanagementsGetErr);
                }

                // Get Teacher staffmanagements list
                var teacherStaffmanagements = teacherStaffmanagementsGetRes.body;

                // Set assertions
                (teacherStaffmanagements[0].user._id).should.equal(userId);
                (teacherStaffmanagements[0].name).should.match('Teacher staffmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Teacher staffmanagement if not logged in', function (done) {
    agent.post('/api/teacherStaffmanagements')
      .send(teacherStaffmanagement)
      .expect(403)
      .end(function (teacherStaffmanagementSaveErr, teacherStaffmanagementSaveRes) {
        // Call the assertion callback
        done(teacherStaffmanagementSaveErr);
      });
  });

  it('should not be able to save an Teacher staffmanagement if no name is provided', function (done) {
    // Invalidate name field
    teacherStaffmanagement.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Teacher staffmanagement
        agent.post('/api/teacherStaffmanagements')
          .send(teacherStaffmanagement)
          .expect(400)
          .end(function (teacherStaffmanagementSaveErr, teacherStaffmanagementSaveRes) {
            // Set message assertion
            (teacherStaffmanagementSaveRes.body.message).should.match('Please fill Teacher staffmanagement name');

            // Handle Teacher staffmanagement save error
            done(teacherStaffmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Teacher staffmanagement if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Teacher staffmanagement
        agent.post('/api/teacherStaffmanagements')
          .send(teacherStaffmanagement)
          .expect(200)
          .end(function (teacherStaffmanagementSaveErr, teacherStaffmanagementSaveRes) {
            // Handle Teacher staffmanagement save error
            if (teacherStaffmanagementSaveErr) {
              return done(teacherStaffmanagementSaveErr);
            }

            // Update Teacher staffmanagement name
            teacherStaffmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Teacher staffmanagement
            agent.put('/api/teacherStaffmanagements/' + teacherStaffmanagementSaveRes.body._id)
              .send(teacherStaffmanagement)
              .expect(200)
              .end(function (teacherStaffmanagementUpdateErr, teacherStaffmanagementUpdateRes) {
                // Handle Teacher staffmanagement update error
                if (teacherStaffmanagementUpdateErr) {
                  return done(teacherStaffmanagementUpdateErr);
                }

                // Set assertions
                (teacherStaffmanagementUpdateRes.body._id).should.equal(teacherStaffmanagementSaveRes.body._id);
                (teacherStaffmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Teacher staffmanagements if not signed in', function (done) {
    // Create new Teacher staffmanagement model instance
    var teacherStaffmanagementObj = new TeacherStaffmanagement(teacherStaffmanagement);

    // Save the teacherStaffmanagement
    teacherStaffmanagementObj.save(function () {
      // Request Teacher staffmanagements
      request(app).get('/api/teacherStaffmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Teacher staffmanagement if not signed in', function (done) {
    // Create new Teacher staffmanagement model instance
    var teacherStaffmanagementObj = new TeacherStaffmanagement(teacherStaffmanagement);

    // Save the Teacher staffmanagement
    teacherStaffmanagementObj.save(function () {
      request(app).get('/api/teacherStaffmanagements/' + teacherStaffmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', teacherStaffmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Teacher staffmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/teacherStaffmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Teacher staffmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Teacher staffmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Teacher staffmanagement
    request(app).get('/api/teacherStaffmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Teacher staffmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Teacher staffmanagement if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Teacher staffmanagement
        agent.post('/api/teacherStaffmanagements')
          .send(teacherStaffmanagement)
          .expect(200)
          .end(function (teacherStaffmanagementSaveErr, teacherStaffmanagementSaveRes) {
            // Handle Teacher staffmanagement save error
            if (teacherStaffmanagementSaveErr) {
              return done(teacherStaffmanagementSaveErr);
            }

            // Delete an existing Teacher staffmanagement
            agent.delete('/api/teacherStaffmanagements/' + teacherStaffmanagementSaveRes.body._id)
              .send(teacherStaffmanagement)
              .expect(200)
              .end(function (teacherStaffmanagementDeleteErr, teacherStaffmanagementDeleteRes) {
                // Handle teacherStaffmanagement error error
                if (teacherStaffmanagementDeleteErr) {
                  return done(teacherStaffmanagementDeleteErr);
                }

                // Set assertions
                (teacherStaffmanagementDeleteRes.body._id).should.equal(teacherStaffmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Teacher staffmanagement if not signed in', function (done) {
    // Set Teacher staffmanagement user
    teacherStaffmanagement.user = user;

    // Create new Teacher staffmanagement model instance
    var teacherStaffmanagementObj = new TeacherStaffmanagement(teacherStaffmanagement);

    // Save the Teacher staffmanagement
    teacherStaffmanagementObj.save(function () {
      // Try deleting Teacher staffmanagement
      request(app).delete('/api/teacherStaffmanagements/' + teacherStaffmanagementObj._id)
        .expect(403)
        .end(function (teacherStaffmanagementDeleteErr, teacherStaffmanagementDeleteRes) {
          // Set message assertion
          (teacherStaffmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Teacher staffmanagement error error
          done(teacherStaffmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Teacher staffmanagement that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Teacher staffmanagement
          agent.post('/api/teacherStaffmanagements')
            .send(teacherStaffmanagement)
            .expect(200)
            .end(function (teacherStaffmanagementSaveErr, teacherStaffmanagementSaveRes) {
              // Handle Teacher staffmanagement save error
              if (teacherStaffmanagementSaveErr) {
                return done(teacherStaffmanagementSaveErr);
              }

              // Set assertions on new Teacher staffmanagement
              (teacherStaffmanagementSaveRes.body.name).should.equal(teacherStaffmanagement.name);
              should.exist(teacherStaffmanagementSaveRes.body.user);
              should.equal(teacherStaffmanagementSaveRes.body.user._id, orphanId);

              // force the Teacher staffmanagement to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Teacher staffmanagement
                    agent.get('/api/teacherStaffmanagements/' + teacherStaffmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (teacherStaffmanagementInfoErr, teacherStaffmanagementInfoRes) {
                        // Handle Teacher staffmanagement error
                        if (teacherStaffmanagementInfoErr) {
                          return done(teacherStaffmanagementInfoErr);
                        }

                        // Set assertions
                        (teacherStaffmanagementInfoRes.body._id).should.equal(teacherStaffmanagementSaveRes.body._id);
                        (teacherStaffmanagementInfoRes.body.name).should.equal(teacherStaffmanagement.name);
                        should.equal(teacherStaffmanagementInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      TeacherStaffmanagement.remove().exec(done);
    });
  });
});
