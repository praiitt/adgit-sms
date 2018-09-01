'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Onlinetestmanagement = mongoose.model('Onlinetestmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  onlinetestmanagement;

/**
 * Onlinetestmanagement routes tests
 */
describe('Onlinetestmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Onlinetestmanagement
    user.save(function () {
      onlinetestmanagement = {
        name: 'Onlinetestmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Onlinetestmanagement if logged in', function (done) {
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

        // Save a new Onlinetestmanagement
        agent.post('/api/onlinetestmanagements')
          .send(onlinetestmanagement)
          .expect(200)
          .end(function (onlinetestmanagementSaveErr, onlinetestmanagementSaveRes) {
            // Handle Onlinetestmanagement save error
            if (onlinetestmanagementSaveErr) {
              return done(onlinetestmanagementSaveErr);
            }

            // Get a list of Onlinetestmanagements
            agent.get('/api/onlinetestmanagements')
              .end(function (onlinetestmanagementsGetErr, onlinetestmanagementsGetRes) {
                // Handle Onlinetestmanagements save error
                if (onlinetestmanagementsGetErr) {
                  return done(onlinetestmanagementsGetErr);
                }

                // Get Onlinetestmanagements list
                var onlinetestmanagements = onlinetestmanagementsGetRes.body;

                // Set assertions
                (onlinetestmanagements[0].user._id).should.equal(userId);
                (onlinetestmanagements[0].name).should.match('Onlinetestmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Onlinetestmanagement if not logged in', function (done) {
    agent.post('/api/onlinetestmanagements')
      .send(onlinetestmanagement)
      .expect(403)
      .end(function (onlinetestmanagementSaveErr, onlinetestmanagementSaveRes) {
        // Call the assertion callback
        done(onlinetestmanagementSaveErr);
      });
  });

  it('should not be able to save an Onlinetestmanagement if no name is provided', function (done) {
    // Invalidate name field
    onlinetestmanagement.name = '';

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

        // Save a new Onlinetestmanagement
        agent.post('/api/onlinetestmanagements')
          .send(onlinetestmanagement)
          .expect(400)
          .end(function (onlinetestmanagementSaveErr, onlinetestmanagementSaveRes) {
            // Set message assertion
            (onlinetestmanagementSaveRes.body.message).should.match('Please fill Onlinetestmanagement name');

            // Handle Onlinetestmanagement save error
            done(onlinetestmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Onlinetestmanagement if signed in', function (done) {
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

        // Save a new Onlinetestmanagement
        agent.post('/api/onlinetestmanagements')
          .send(onlinetestmanagement)
          .expect(200)
          .end(function (onlinetestmanagementSaveErr, onlinetestmanagementSaveRes) {
            // Handle Onlinetestmanagement save error
            if (onlinetestmanagementSaveErr) {
              return done(onlinetestmanagementSaveErr);
            }

            // Update Onlinetestmanagement name
            onlinetestmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Onlinetestmanagement
            agent.put('/api/onlinetestmanagements/' + onlinetestmanagementSaveRes.body._id)
              .send(onlinetestmanagement)
              .expect(200)
              .end(function (onlinetestmanagementUpdateErr, onlinetestmanagementUpdateRes) {
                // Handle Onlinetestmanagement update error
                if (onlinetestmanagementUpdateErr) {
                  return done(onlinetestmanagementUpdateErr);
                }

                // Set assertions
                (onlinetestmanagementUpdateRes.body._id).should.equal(onlinetestmanagementSaveRes.body._id);
                (onlinetestmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Onlinetestmanagements if not signed in', function (done) {
    // Create new Onlinetestmanagement model instance
    var onlinetestmanagementObj = new Onlinetestmanagement(onlinetestmanagement);

    // Save the onlinetestmanagement
    onlinetestmanagementObj.save(function () {
      // Request Onlinetestmanagements
      request(app).get('/api/onlinetestmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Onlinetestmanagement if not signed in', function (done) {
    // Create new Onlinetestmanagement model instance
    var onlinetestmanagementObj = new Onlinetestmanagement(onlinetestmanagement);

    // Save the Onlinetestmanagement
    onlinetestmanagementObj.save(function () {
      request(app).get('/api/onlinetestmanagements/' + onlinetestmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', onlinetestmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Onlinetestmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/onlinetestmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Onlinetestmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Onlinetestmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Onlinetestmanagement
    request(app).get('/api/onlinetestmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Onlinetestmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Onlinetestmanagement if signed in', function (done) {
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

        // Save a new Onlinetestmanagement
        agent.post('/api/onlinetestmanagements')
          .send(onlinetestmanagement)
          .expect(200)
          .end(function (onlinetestmanagementSaveErr, onlinetestmanagementSaveRes) {
            // Handle Onlinetestmanagement save error
            if (onlinetestmanagementSaveErr) {
              return done(onlinetestmanagementSaveErr);
            }

            // Delete an existing Onlinetestmanagement
            agent.delete('/api/onlinetestmanagements/' + onlinetestmanagementSaveRes.body._id)
              .send(onlinetestmanagement)
              .expect(200)
              .end(function (onlinetestmanagementDeleteErr, onlinetestmanagementDeleteRes) {
                // Handle onlinetestmanagement error error
                if (onlinetestmanagementDeleteErr) {
                  return done(onlinetestmanagementDeleteErr);
                }

                // Set assertions
                (onlinetestmanagementDeleteRes.body._id).should.equal(onlinetestmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Onlinetestmanagement if not signed in', function (done) {
    // Set Onlinetestmanagement user
    onlinetestmanagement.user = user;

    // Create new Onlinetestmanagement model instance
    var onlinetestmanagementObj = new Onlinetestmanagement(onlinetestmanagement);

    // Save the Onlinetestmanagement
    onlinetestmanagementObj.save(function () {
      // Try deleting Onlinetestmanagement
      request(app).delete('/api/onlinetestmanagements/' + onlinetestmanagementObj._id)
        .expect(403)
        .end(function (onlinetestmanagementDeleteErr, onlinetestmanagementDeleteRes) {
          // Set message assertion
          (onlinetestmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Onlinetestmanagement error error
          done(onlinetestmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Onlinetestmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Onlinetestmanagement
          agent.post('/api/onlinetestmanagements')
            .send(onlinetestmanagement)
            .expect(200)
            .end(function (onlinetestmanagementSaveErr, onlinetestmanagementSaveRes) {
              // Handle Onlinetestmanagement save error
              if (onlinetestmanagementSaveErr) {
                return done(onlinetestmanagementSaveErr);
              }

              // Set assertions on new Onlinetestmanagement
              (onlinetestmanagementSaveRes.body.name).should.equal(onlinetestmanagement.name);
              should.exist(onlinetestmanagementSaveRes.body.user);
              should.equal(onlinetestmanagementSaveRes.body.user._id, orphanId);

              // force the Onlinetestmanagement to have an orphaned user reference
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

                    // Get the Onlinetestmanagement
                    agent.get('/api/onlinetestmanagements/' + onlinetestmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (onlinetestmanagementInfoErr, onlinetestmanagementInfoRes) {
                        // Handle Onlinetestmanagement error
                        if (onlinetestmanagementInfoErr) {
                          return done(onlinetestmanagementInfoErr);
                        }

                        // Set assertions
                        (onlinetestmanagementInfoRes.body._id).should.equal(onlinetestmanagementSaveRes.body._id);
                        (onlinetestmanagementInfoRes.body.name).should.equal(onlinetestmanagement.name);
                        should.equal(onlinetestmanagementInfoRes.body.user, undefined);

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
      Onlinetestmanagement.remove().exec(done);
    });
  });
});
