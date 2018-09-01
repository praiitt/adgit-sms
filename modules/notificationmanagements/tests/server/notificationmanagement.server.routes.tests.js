'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Notificationmanagement = mongoose.model('Notificationmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  notificationmanagement;

/**
 * Notificationmanagement routes tests
 */
describe('Notificationmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Notificationmanagement
    user.save(function () {
      notificationmanagement = {
        name: 'Notificationmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Notificationmanagement if logged in', function (done) {
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

        // Save a new Notificationmanagement
        agent.post('/api/notificationmanagements')
          .send(notificationmanagement)
          .expect(200)
          .end(function (notificationmanagementSaveErr, notificationmanagementSaveRes) {
            // Handle Notificationmanagement save error
            if (notificationmanagementSaveErr) {
              return done(notificationmanagementSaveErr);
            }

            // Get a list of Notificationmanagements
            agent.get('/api/notificationmanagements')
              .end(function (notificationmanagementsGetErr, notificationmanagementsGetRes) {
                // Handle Notificationmanagements save error
                if (notificationmanagementsGetErr) {
                  return done(notificationmanagementsGetErr);
                }

                // Get Notificationmanagements list
                var notificationmanagements = notificationmanagementsGetRes.body;

                // Set assertions
                (notificationmanagements[0].user._id).should.equal(userId);
                (notificationmanagements[0].name).should.match('Notificationmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Notificationmanagement if not logged in', function (done) {
    agent.post('/api/notificationmanagements')
      .send(notificationmanagement)
      .expect(403)
      .end(function (notificationmanagementSaveErr, notificationmanagementSaveRes) {
        // Call the assertion callback
        done(notificationmanagementSaveErr);
      });
  });

  it('should not be able to save an Notificationmanagement if no name is provided', function (done) {
    // Invalidate name field
    notificationmanagement.name = '';

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

        // Save a new Notificationmanagement
        agent.post('/api/notificationmanagements')
          .send(notificationmanagement)
          .expect(400)
          .end(function (notificationmanagementSaveErr, notificationmanagementSaveRes) {
            // Set message assertion
            (notificationmanagementSaveRes.body.message).should.match('Please fill Notificationmanagement name');

            // Handle Notificationmanagement save error
            done(notificationmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Notificationmanagement if signed in', function (done) {
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

        // Save a new Notificationmanagement
        agent.post('/api/notificationmanagements')
          .send(notificationmanagement)
          .expect(200)
          .end(function (notificationmanagementSaveErr, notificationmanagementSaveRes) {
            // Handle Notificationmanagement save error
            if (notificationmanagementSaveErr) {
              return done(notificationmanagementSaveErr);
            }

            // Update Notificationmanagement name
            notificationmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Notificationmanagement
            agent.put('/api/notificationmanagements/' + notificationmanagementSaveRes.body._id)
              .send(notificationmanagement)
              .expect(200)
              .end(function (notificationmanagementUpdateErr, notificationmanagementUpdateRes) {
                // Handle Notificationmanagement update error
                if (notificationmanagementUpdateErr) {
                  return done(notificationmanagementUpdateErr);
                }

                // Set assertions
                (notificationmanagementUpdateRes.body._id).should.equal(notificationmanagementSaveRes.body._id);
                (notificationmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Notificationmanagements if not signed in', function (done) {
    // Create new Notificationmanagement model instance
    var notificationmanagementObj = new Notificationmanagement(notificationmanagement);

    // Save the notificationmanagement
    notificationmanagementObj.save(function () {
      // Request Notificationmanagements
      request(app).get('/api/notificationmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Notificationmanagement if not signed in', function (done) {
    // Create new Notificationmanagement model instance
    var notificationmanagementObj = new Notificationmanagement(notificationmanagement);

    // Save the Notificationmanagement
    notificationmanagementObj.save(function () {
      request(app).get('/api/notificationmanagements/' + notificationmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', notificationmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Notificationmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/notificationmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Notificationmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Notificationmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Notificationmanagement
    request(app).get('/api/notificationmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Notificationmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Notificationmanagement if signed in', function (done) {
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

        // Save a new Notificationmanagement
        agent.post('/api/notificationmanagements')
          .send(notificationmanagement)
          .expect(200)
          .end(function (notificationmanagementSaveErr, notificationmanagementSaveRes) {
            // Handle Notificationmanagement save error
            if (notificationmanagementSaveErr) {
              return done(notificationmanagementSaveErr);
            }

            // Delete an existing Notificationmanagement
            agent.delete('/api/notificationmanagements/' + notificationmanagementSaveRes.body._id)
              .send(notificationmanagement)
              .expect(200)
              .end(function (notificationmanagementDeleteErr, notificationmanagementDeleteRes) {
                // Handle notificationmanagement error error
                if (notificationmanagementDeleteErr) {
                  return done(notificationmanagementDeleteErr);
                }

                // Set assertions
                (notificationmanagementDeleteRes.body._id).should.equal(notificationmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Notificationmanagement if not signed in', function (done) {
    // Set Notificationmanagement user
    notificationmanagement.user = user;

    // Create new Notificationmanagement model instance
    var notificationmanagementObj = new Notificationmanagement(notificationmanagement);

    // Save the Notificationmanagement
    notificationmanagementObj.save(function () {
      // Try deleting Notificationmanagement
      request(app).delete('/api/notificationmanagements/' + notificationmanagementObj._id)
        .expect(403)
        .end(function (notificationmanagementDeleteErr, notificationmanagementDeleteRes) {
          // Set message assertion
          (notificationmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Notificationmanagement error error
          done(notificationmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Notificationmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Notificationmanagement
          agent.post('/api/notificationmanagements')
            .send(notificationmanagement)
            .expect(200)
            .end(function (notificationmanagementSaveErr, notificationmanagementSaveRes) {
              // Handle Notificationmanagement save error
              if (notificationmanagementSaveErr) {
                return done(notificationmanagementSaveErr);
              }

              // Set assertions on new Notificationmanagement
              (notificationmanagementSaveRes.body.name).should.equal(notificationmanagement.name);
              should.exist(notificationmanagementSaveRes.body.user);
              should.equal(notificationmanagementSaveRes.body.user._id, orphanId);

              // force the Notificationmanagement to have an orphaned user reference
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

                    // Get the Notificationmanagement
                    agent.get('/api/notificationmanagements/' + notificationmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (notificationmanagementInfoErr, notificationmanagementInfoRes) {
                        // Handle Notificationmanagement error
                        if (notificationmanagementInfoErr) {
                          return done(notificationmanagementInfoErr);
                        }

                        // Set assertions
                        (notificationmanagementInfoRes.body._id).should.equal(notificationmanagementSaveRes.body._id);
                        (notificationmanagementInfoRes.body.name).should.equal(notificationmanagement.name);
                        should.equal(notificationmanagementInfoRes.body.user, undefined);

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
      Notificationmanagement.remove().exec(done);
    });
  });
});
