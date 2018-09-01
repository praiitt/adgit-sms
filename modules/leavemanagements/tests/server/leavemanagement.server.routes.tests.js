'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Leavemanagement = mongoose.model('Leavemanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  leavemanagement;

/**
 * Leavemanagement routes tests
 */
describe('Leavemanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Leavemanagement
    user.save(function () {
      leavemanagement = {
        name: 'Leavemanagement name'
      };

      done();
    });
  });

  it('should be able to save a Leavemanagement if logged in', function (done) {
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

        // Save a new Leavemanagement
        agent.post('/api/leavemanagements')
          .send(leavemanagement)
          .expect(200)
          .end(function (leavemanagementSaveErr, leavemanagementSaveRes) {
            // Handle Leavemanagement save error
            if (leavemanagementSaveErr) {
              return done(leavemanagementSaveErr);
            }

            // Get a list of Leavemanagements
            agent.get('/api/leavemanagements')
              .end(function (leavemanagementsGetErr, leavemanagementsGetRes) {
                // Handle Leavemanagements save error
                if (leavemanagementsGetErr) {
                  return done(leavemanagementsGetErr);
                }

                // Get Leavemanagements list
                var leavemanagements = leavemanagementsGetRes.body;

                // Set assertions
                (leavemanagements[0].user._id).should.equal(userId);
                (leavemanagements[0].name).should.match('Leavemanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Leavemanagement if not logged in', function (done) {
    agent.post('/api/leavemanagements')
      .send(leavemanagement)
      .expect(403)
      .end(function (leavemanagementSaveErr, leavemanagementSaveRes) {
        // Call the assertion callback
        done(leavemanagementSaveErr);
      });
  });

  it('should not be able to save an Leavemanagement if no name is provided', function (done) {
    // Invalidate name field
    leavemanagement.name = '';

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

        // Save a new Leavemanagement
        agent.post('/api/leavemanagements')
          .send(leavemanagement)
          .expect(400)
          .end(function (leavemanagementSaveErr, leavemanagementSaveRes) {
            // Set message assertion
            (leavemanagementSaveRes.body.message).should.match('Please fill Leavemanagement name');

            // Handle Leavemanagement save error
            done(leavemanagementSaveErr);
          });
      });
  });

  it('should be able to update an Leavemanagement if signed in', function (done) {
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

        // Save a new Leavemanagement
        agent.post('/api/leavemanagements')
          .send(leavemanagement)
          .expect(200)
          .end(function (leavemanagementSaveErr, leavemanagementSaveRes) {
            // Handle Leavemanagement save error
            if (leavemanagementSaveErr) {
              return done(leavemanagementSaveErr);
            }

            // Update Leavemanagement name
            leavemanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Leavemanagement
            agent.put('/api/leavemanagements/' + leavemanagementSaveRes.body._id)
              .send(leavemanagement)
              .expect(200)
              .end(function (leavemanagementUpdateErr, leavemanagementUpdateRes) {
                // Handle Leavemanagement update error
                if (leavemanagementUpdateErr) {
                  return done(leavemanagementUpdateErr);
                }

                // Set assertions
                (leavemanagementUpdateRes.body._id).should.equal(leavemanagementSaveRes.body._id);
                (leavemanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Leavemanagements if not signed in', function (done) {
    // Create new Leavemanagement model instance
    var leavemanagementObj = new Leavemanagement(leavemanagement);

    // Save the leavemanagement
    leavemanagementObj.save(function () {
      // Request Leavemanagements
      request(app).get('/api/leavemanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Leavemanagement if not signed in', function (done) {
    // Create new Leavemanagement model instance
    var leavemanagementObj = new Leavemanagement(leavemanagement);

    // Save the Leavemanagement
    leavemanagementObj.save(function () {
      request(app).get('/api/leavemanagements/' + leavemanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', leavemanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Leavemanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/leavemanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Leavemanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Leavemanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Leavemanagement
    request(app).get('/api/leavemanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Leavemanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Leavemanagement if signed in', function (done) {
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

        // Save a new Leavemanagement
        agent.post('/api/leavemanagements')
          .send(leavemanagement)
          .expect(200)
          .end(function (leavemanagementSaveErr, leavemanagementSaveRes) {
            // Handle Leavemanagement save error
            if (leavemanagementSaveErr) {
              return done(leavemanagementSaveErr);
            }

            // Delete an existing Leavemanagement
            agent.delete('/api/leavemanagements/' + leavemanagementSaveRes.body._id)
              .send(leavemanagement)
              .expect(200)
              .end(function (leavemanagementDeleteErr, leavemanagementDeleteRes) {
                // Handle leavemanagement error error
                if (leavemanagementDeleteErr) {
                  return done(leavemanagementDeleteErr);
                }

                // Set assertions
                (leavemanagementDeleteRes.body._id).should.equal(leavemanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Leavemanagement if not signed in', function (done) {
    // Set Leavemanagement user
    leavemanagement.user = user;

    // Create new Leavemanagement model instance
    var leavemanagementObj = new Leavemanagement(leavemanagement);

    // Save the Leavemanagement
    leavemanagementObj.save(function () {
      // Try deleting Leavemanagement
      request(app).delete('/api/leavemanagements/' + leavemanagementObj._id)
        .expect(403)
        .end(function (leavemanagementDeleteErr, leavemanagementDeleteRes) {
          // Set message assertion
          (leavemanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Leavemanagement error error
          done(leavemanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Leavemanagement that has an orphaned user reference', function (done) {
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

          // Save a new Leavemanagement
          agent.post('/api/leavemanagements')
            .send(leavemanagement)
            .expect(200)
            .end(function (leavemanagementSaveErr, leavemanagementSaveRes) {
              // Handle Leavemanagement save error
              if (leavemanagementSaveErr) {
                return done(leavemanagementSaveErr);
              }

              // Set assertions on new Leavemanagement
              (leavemanagementSaveRes.body.name).should.equal(leavemanagement.name);
              should.exist(leavemanagementSaveRes.body.user);
              should.equal(leavemanagementSaveRes.body.user._id, orphanId);

              // force the Leavemanagement to have an orphaned user reference
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

                    // Get the Leavemanagement
                    agent.get('/api/leavemanagements/' + leavemanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (leavemanagementInfoErr, leavemanagementInfoRes) {
                        // Handle Leavemanagement error
                        if (leavemanagementInfoErr) {
                          return done(leavemanagementInfoErr);
                        }

                        // Set assertions
                        (leavemanagementInfoRes.body._id).should.equal(leavemanagementSaveRes.body._id);
                        (leavemanagementInfoRes.body.name).should.equal(leavemanagement.name);
                        should.equal(leavemanagementInfoRes.body.user, undefined);

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
      Leavemanagement.remove().exec(done);
    });
  });
});
