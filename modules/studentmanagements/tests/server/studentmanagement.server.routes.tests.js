'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Studentmanagement = mongoose.model('Studentmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  studentmanagement;

/**
 * Studentmanagement routes tests
 */
describe('Studentmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Studentmanagement
    user.save(function () {
      studentmanagement = {
        name: 'Studentmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Studentmanagement if logged in', function (done) {
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

        // Save a new Studentmanagement
        agent.post('/api/studentmanagements')
          .send(studentmanagement)
          .expect(200)
          .end(function (studentmanagementSaveErr, studentmanagementSaveRes) {
            // Handle Studentmanagement save error
            if (studentmanagementSaveErr) {
              return done(studentmanagementSaveErr);
            }

            // Get a list of Studentmanagements
            agent.get('/api/studentmanagements')
              .end(function (studentmanagementsGetErr, studentmanagementsGetRes) {
                // Handle Studentmanagements save error
                if (studentmanagementsGetErr) {
                  return done(studentmanagementsGetErr);
                }

                // Get Studentmanagements list
                var studentmanagements = studentmanagementsGetRes.body;

                // Set assertions
                (studentmanagements[0].user._id).should.equal(userId);
                (studentmanagements[0].name).should.match('Studentmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Studentmanagement if not logged in', function (done) {
    agent.post('/api/studentmanagements')
      .send(studentmanagement)
      .expect(403)
      .end(function (studentmanagementSaveErr, studentmanagementSaveRes) {
        // Call the assertion callback
        done(studentmanagementSaveErr);
      });
  });

  it('should not be able to save an Studentmanagement if no name is provided', function (done) {
    // Invalidate name field
    studentmanagement.name = '';

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

        // Save a new Studentmanagement
        agent.post('/api/studentmanagements')
          .send(studentmanagement)
          .expect(400)
          .end(function (studentmanagementSaveErr, studentmanagementSaveRes) {
            // Set message assertion
            (studentmanagementSaveRes.body.message).should.match('Please fill Studentmanagement name');

            // Handle Studentmanagement save error
            done(studentmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Studentmanagement if signed in', function (done) {
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

        // Save a new Studentmanagement
        agent.post('/api/studentmanagements')
          .send(studentmanagement)
          .expect(200)
          .end(function (studentmanagementSaveErr, studentmanagementSaveRes) {
            // Handle Studentmanagement save error
            if (studentmanagementSaveErr) {
              return done(studentmanagementSaveErr);
            }

            // Update Studentmanagement name
            studentmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Studentmanagement
            agent.put('/api/studentmanagements/' + studentmanagementSaveRes.body._id)
              .send(studentmanagement)
              .expect(200)
              .end(function (studentmanagementUpdateErr, studentmanagementUpdateRes) {
                // Handle Studentmanagement update error
                if (studentmanagementUpdateErr) {
                  return done(studentmanagementUpdateErr);
                }

                // Set assertions
                (studentmanagementUpdateRes.body._id).should.equal(studentmanagementSaveRes.body._id);
                (studentmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Studentmanagements if not signed in', function (done) {
    // Create new Studentmanagement model instance
    var studentmanagementObj = new Studentmanagement(studentmanagement);

    // Save the studentmanagement
    studentmanagementObj.save(function () {
      // Request Studentmanagements
      request(app).get('/api/studentmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Studentmanagement if not signed in', function (done) {
    // Create new Studentmanagement model instance
    var studentmanagementObj = new Studentmanagement(studentmanagement);

    // Save the Studentmanagement
    studentmanagementObj.save(function () {
      request(app).get('/api/studentmanagements/' + studentmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', studentmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Studentmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/studentmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Studentmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Studentmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Studentmanagement
    request(app).get('/api/studentmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Studentmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Studentmanagement if signed in', function (done) {
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

        // Save a new Studentmanagement
        agent.post('/api/studentmanagements')
          .send(studentmanagement)
          .expect(200)
          .end(function (studentmanagementSaveErr, studentmanagementSaveRes) {
            // Handle Studentmanagement save error
            if (studentmanagementSaveErr) {
              return done(studentmanagementSaveErr);
            }

            // Delete an existing Studentmanagement
            agent.delete('/api/studentmanagements/' + studentmanagementSaveRes.body._id)
              .send(studentmanagement)
              .expect(200)
              .end(function (studentmanagementDeleteErr, studentmanagementDeleteRes) {
                // Handle studentmanagement error error
                if (studentmanagementDeleteErr) {
                  return done(studentmanagementDeleteErr);
                }

                // Set assertions
                (studentmanagementDeleteRes.body._id).should.equal(studentmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Studentmanagement if not signed in', function (done) {
    // Set Studentmanagement user
    studentmanagement.user = user;

    // Create new Studentmanagement model instance
    var studentmanagementObj = new Studentmanagement(studentmanagement);

    // Save the Studentmanagement
    studentmanagementObj.save(function () {
      // Try deleting Studentmanagement
      request(app).delete('/api/studentmanagements/' + studentmanagementObj._id)
        .expect(403)
        .end(function (studentmanagementDeleteErr, studentmanagementDeleteRes) {
          // Set message assertion
          (studentmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Studentmanagement error error
          done(studentmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Studentmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Studentmanagement
          agent.post('/api/studentmanagements')
            .send(studentmanagement)
            .expect(200)
            .end(function (studentmanagementSaveErr, studentmanagementSaveRes) {
              // Handle Studentmanagement save error
              if (studentmanagementSaveErr) {
                return done(studentmanagementSaveErr);
              }

              // Set assertions on new Studentmanagement
              (studentmanagementSaveRes.body.name).should.equal(studentmanagement.name);
              should.exist(studentmanagementSaveRes.body.user);
              should.equal(studentmanagementSaveRes.body.user._id, orphanId);

              // force the Studentmanagement to have an orphaned user reference
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

                    // Get the Studentmanagement
                    agent.get('/api/studentmanagements/' + studentmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (studentmanagementInfoErr, studentmanagementInfoRes) {
                        // Handle Studentmanagement error
                        if (studentmanagementInfoErr) {
                          return done(studentmanagementInfoErr);
                        }

                        // Set assertions
                        (studentmanagementInfoRes.body._id).should.equal(studentmanagementSaveRes.body._id);
                        (studentmanagementInfoRes.body.name).should.equal(studentmanagement.name);
                        should.equal(studentmanagementInfoRes.body.user, undefined);

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
      Studentmanagement.remove().exec(done);
    });
  });
});
