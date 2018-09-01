'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Attendancemanagement = mongoose.model('Attendancemanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  attendancemanagement;

/**
 * Attendancemanagement routes tests
 */
describe('Attendancemanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Attendancemanagement
    user.save(function () {
      attendancemanagement = {
        name: 'Attendancemanagement name'
      };

      done();
    });
  });

  it('should be able to save a Attendancemanagement if logged in', function (done) {
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

        // Save a new Attendancemanagement
        agent.post('/api/attendancemanagements')
          .send(attendancemanagement)
          .expect(200)
          .end(function (attendancemanagementSaveErr, attendancemanagementSaveRes) {
            // Handle Attendancemanagement save error
            if (attendancemanagementSaveErr) {
              return done(attendancemanagementSaveErr);
            }

            // Get a list of Attendancemanagements
            agent.get('/api/attendancemanagements')
              .end(function (attendancemanagementsGetErr, attendancemanagementsGetRes) {
                // Handle Attendancemanagements save error
                if (attendancemanagementsGetErr) {
                  return done(attendancemanagementsGetErr);
                }

                // Get Attendancemanagements list
                var attendancemanagements = attendancemanagementsGetRes.body;

                // Set assertions
                (attendancemanagements[0].user._id).should.equal(userId);
                (attendancemanagements[0].name).should.match('Attendancemanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Attendancemanagement if not logged in', function (done) {
    agent.post('/api/attendancemanagements')
      .send(attendancemanagement)
      .expect(403)
      .end(function (attendancemanagementSaveErr, attendancemanagementSaveRes) {
        // Call the assertion callback
        done(attendancemanagementSaveErr);
      });
  });

  it('should not be able to save an Attendancemanagement if no name is provided', function (done) {
    // Invalidate name field
    attendancemanagement.name = '';

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

        // Save a new Attendancemanagement
        agent.post('/api/attendancemanagements')
          .send(attendancemanagement)
          .expect(400)
          .end(function (attendancemanagementSaveErr, attendancemanagementSaveRes) {
            // Set message assertion
            (attendancemanagementSaveRes.body.message).should.match('Please fill Attendancemanagement name');

            // Handle Attendancemanagement save error
            done(attendancemanagementSaveErr);
          });
      });
  });

  it('should be able to update an Attendancemanagement if signed in', function (done) {
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

        // Save a new Attendancemanagement
        agent.post('/api/attendancemanagements')
          .send(attendancemanagement)
          .expect(200)
          .end(function (attendancemanagementSaveErr, attendancemanagementSaveRes) {
            // Handle Attendancemanagement save error
            if (attendancemanagementSaveErr) {
              return done(attendancemanagementSaveErr);
            }

            // Update Attendancemanagement name
            attendancemanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Attendancemanagement
            agent.put('/api/attendancemanagements/' + attendancemanagementSaveRes.body._id)
              .send(attendancemanagement)
              .expect(200)
              .end(function (attendancemanagementUpdateErr, attendancemanagementUpdateRes) {
                // Handle Attendancemanagement update error
                if (attendancemanagementUpdateErr) {
                  return done(attendancemanagementUpdateErr);
                }

                // Set assertions
                (attendancemanagementUpdateRes.body._id).should.equal(attendancemanagementSaveRes.body._id);
                (attendancemanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Attendancemanagements if not signed in', function (done) {
    // Create new Attendancemanagement model instance
    var attendancemanagementObj = new Attendancemanagement(attendancemanagement);

    // Save the attendancemanagement
    attendancemanagementObj.save(function () {
      // Request Attendancemanagements
      request(app).get('/api/attendancemanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Attendancemanagement if not signed in', function (done) {
    // Create new Attendancemanagement model instance
    var attendancemanagementObj = new Attendancemanagement(attendancemanagement);

    // Save the Attendancemanagement
    attendancemanagementObj.save(function () {
      request(app).get('/api/attendancemanagements/' + attendancemanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', attendancemanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Attendancemanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/attendancemanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Attendancemanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Attendancemanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Attendancemanagement
    request(app).get('/api/attendancemanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Attendancemanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Attendancemanagement if signed in', function (done) {
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

        // Save a new Attendancemanagement
        agent.post('/api/attendancemanagements')
          .send(attendancemanagement)
          .expect(200)
          .end(function (attendancemanagementSaveErr, attendancemanagementSaveRes) {
            // Handle Attendancemanagement save error
            if (attendancemanagementSaveErr) {
              return done(attendancemanagementSaveErr);
            }

            // Delete an existing Attendancemanagement
            agent.delete('/api/attendancemanagements/' + attendancemanagementSaveRes.body._id)
              .send(attendancemanagement)
              .expect(200)
              .end(function (attendancemanagementDeleteErr, attendancemanagementDeleteRes) {
                // Handle attendancemanagement error error
                if (attendancemanagementDeleteErr) {
                  return done(attendancemanagementDeleteErr);
                }

                // Set assertions
                (attendancemanagementDeleteRes.body._id).should.equal(attendancemanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Attendancemanagement if not signed in', function (done) {
    // Set Attendancemanagement user
    attendancemanagement.user = user;

    // Create new Attendancemanagement model instance
    var attendancemanagementObj = new Attendancemanagement(attendancemanagement);

    // Save the Attendancemanagement
    attendancemanagementObj.save(function () {
      // Try deleting Attendancemanagement
      request(app).delete('/api/attendancemanagements/' + attendancemanagementObj._id)
        .expect(403)
        .end(function (attendancemanagementDeleteErr, attendancemanagementDeleteRes) {
          // Set message assertion
          (attendancemanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Attendancemanagement error error
          done(attendancemanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Attendancemanagement that has an orphaned user reference', function (done) {
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

          // Save a new Attendancemanagement
          agent.post('/api/attendancemanagements')
            .send(attendancemanagement)
            .expect(200)
            .end(function (attendancemanagementSaveErr, attendancemanagementSaveRes) {
              // Handle Attendancemanagement save error
              if (attendancemanagementSaveErr) {
                return done(attendancemanagementSaveErr);
              }

              // Set assertions on new Attendancemanagement
              (attendancemanagementSaveRes.body.name).should.equal(attendancemanagement.name);
              should.exist(attendancemanagementSaveRes.body.user);
              should.equal(attendancemanagementSaveRes.body.user._id, orphanId);

              // force the Attendancemanagement to have an orphaned user reference
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

                    // Get the Attendancemanagement
                    agent.get('/api/attendancemanagements/' + attendancemanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (attendancemanagementInfoErr, attendancemanagementInfoRes) {
                        // Handle Attendancemanagement error
                        if (attendancemanagementInfoErr) {
                          return done(attendancemanagementInfoErr);
                        }

                        // Set assertions
                        (attendancemanagementInfoRes.body._id).should.equal(attendancemanagementSaveRes.body._id);
                        (attendancemanagementInfoRes.body.name).should.equal(attendancemanagement.name);
                        should.equal(attendancemanagementInfoRes.body.user, undefined);

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
      Attendancemanagement.remove().exec(done);
    });
  });
});
