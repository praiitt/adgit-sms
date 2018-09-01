'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Transportmanagement = mongoose.model('Transportmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  transportmanagement;

/**
 * Transportmanagement routes tests
 */
describe('Transportmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Transportmanagement
    user.save(function () {
      transportmanagement = {
        name: 'Transportmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Transportmanagement if logged in', function (done) {
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

        // Save a new Transportmanagement
        agent.post('/api/transportmanagements')
          .send(transportmanagement)
          .expect(200)
          .end(function (transportmanagementSaveErr, transportmanagementSaveRes) {
            // Handle Transportmanagement save error
            if (transportmanagementSaveErr) {
              return done(transportmanagementSaveErr);
            }

            // Get a list of Transportmanagements
            agent.get('/api/transportmanagements')
              .end(function (transportmanagementsGetErr, transportmanagementsGetRes) {
                // Handle Transportmanagements save error
                if (transportmanagementsGetErr) {
                  return done(transportmanagementsGetErr);
                }

                // Get Transportmanagements list
                var transportmanagements = transportmanagementsGetRes.body;

                // Set assertions
                (transportmanagements[0].user._id).should.equal(userId);
                (transportmanagements[0].name).should.match('Transportmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Transportmanagement if not logged in', function (done) {
    agent.post('/api/transportmanagements')
      .send(transportmanagement)
      .expect(403)
      .end(function (transportmanagementSaveErr, transportmanagementSaveRes) {
        // Call the assertion callback
        done(transportmanagementSaveErr);
      });
  });

  it('should not be able to save an Transportmanagement if no name is provided', function (done) {
    // Invalidate name field
    transportmanagement.name = '';

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

        // Save a new Transportmanagement
        agent.post('/api/transportmanagements')
          .send(transportmanagement)
          .expect(400)
          .end(function (transportmanagementSaveErr, transportmanagementSaveRes) {
            // Set message assertion
            (transportmanagementSaveRes.body.message).should.match('Please fill Transportmanagement name');

            // Handle Transportmanagement save error
            done(transportmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Transportmanagement if signed in', function (done) {
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

        // Save a new Transportmanagement
        agent.post('/api/transportmanagements')
          .send(transportmanagement)
          .expect(200)
          .end(function (transportmanagementSaveErr, transportmanagementSaveRes) {
            // Handle Transportmanagement save error
            if (transportmanagementSaveErr) {
              return done(transportmanagementSaveErr);
            }

            // Update Transportmanagement name
            transportmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Transportmanagement
            agent.put('/api/transportmanagements/' + transportmanagementSaveRes.body._id)
              .send(transportmanagement)
              .expect(200)
              .end(function (transportmanagementUpdateErr, transportmanagementUpdateRes) {
                // Handle Transportmanagement update error
                if (transportmanagementUpdateErr) {
                  return done(transportmanagementUpdateErr);
                }

                // Set assertions
                (transportmanagementUpdateRes.body._id).should.equal(transportmanagementSaveRes.body._id);
                (transportmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Transportmanagements if not signed in', function (done) {
    // Create new Transportmanagement model instance
    var transportmanagementObj = new Transportmanagement(transportmanagement);

    // Save the transportmanagement
    transportmanagementObj.save(function () {
      // Request Transportmanagements
      request(app).get('/api/transportmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Transportmanagement if not signed in', function (done) {
    // Create new Transportmanagement model instance
    var transportmanagementObj = new Transportmanagement(transportmanagement);

    // Save the Transportmanagement
    transportmanagementObj.save(function () {
      request(app).get('/api/transportmanagements/' + transportmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', transportmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Transportmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/transportmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Transportmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Transportmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Transportmanagement
    request(app).get('/api/transportmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Transportmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Transportmanagement if signed in', function (done) {
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

        // Save a new Transportmanagement
        agent.post('/api/transportmanagements')
          .send(transportmanagement)
          .expect(200)
          .end(function (transportmanagementSaveErr, transportmanagementSaveRes) {
            // Handle Transportmanagement save error
            if (transportmanagementSaveErr) {
              return done(transportmanagementSaveErr);
            }

            // Delete an existing Transportmanagement
            agent.delete('/api/transportmanagements/' + transportmanagementSaveRes.body._id)
              .send(transportmanagement)
              .expect(200)
              .end(function (transportmanagementDeleteErr, transportmanagementDeleteRes) {
                // Handle transportmanagement error error
                if (transportmanagementDeleteErr) {
                  return done(transportmanagementDeleteErr);
                }

                // Set assertions
                (transportmanagementDeleteRes.body._id).should.equal(transportmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Transportmanagement if not signed in', function (done) {
    // Set Transportmanagement user
    transportmanagement.user = user;

    // Create new Transportmanagement model instance
    var transportmanagementObj = new Transportmanagement(transportmanagement);

    // Save the Transportmanagement
    transportmanagementObj.save(function () {
      // Try deleting Transportmanagement
      request(app).delete('/api/transportmanagements/' + transportmanagementObj._id)
        .expect(403)
        .end(function (transportmanagementDeleteErr, transportmanagementDeleteRes) {
          // Set message assertion
          (transportmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Transportmanagement error error
          done(transportmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Transportmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Transportmanagement
          agent.post('/api/transportmanagements')
            .send(transportmanagement)
            .expect(200)
            .end(function (transportmanagementSaveErr, transportmanagementSaveRes) {
              // Handle Transportmanagement save error
              if (transportmanagementSaveErr) {
                return done(transportmanagementSaveErr);
              }

              // Set assertions on new Transportmanagement
              (transportmanagementSaveRes.body.name).should.equal(transportmanagement.name);
              should.exist(transportmanagementSaveRes.body.user);
              should.equal(transportmanagementSaveRes.body.user._id, orphanId);

              // force the Transportmanagement to have an orphaned user reference
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

                    // Get the Transportmanagement
                    agent.get('/api/transportmanagements/' + transportmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (transportmanagementInfoErr, transportmanagementInfoRes) {
                        // Handle Transportmanagement error
                        if (transportmanagementInfoErr) {
                          return done(transportmanagementInfoErr);
                        }

                        // Set assertions
                        (transportmanagementInfoRes.body._id).should.equal(transportmanagementSaveRes.body._id);
                        (transportmanagementInfoRes.body.name).should.equal(transportmanagement.name);
                        should.equal(transportmanagementInfoRes.body.user, undefined);

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
      Transportmanagement.remove().exec(done);
    });
  });
});
