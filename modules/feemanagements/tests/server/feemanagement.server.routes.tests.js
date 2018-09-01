'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Feemanagement = mongoose.model('Feemanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  feemanagement;

/**
 * Feemanagement routes tests
 */
describe('Feemanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Feemanagement
    user.save(function () {
      feemanagement = {
        name: 'Feemanagement name'
      };

      done();
    });
  });

  it('should be able to save a Feemanagement if logged in', function (done) {
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

        // Save a new Feemanagement
        agent.post('/api/feemanagements')
          .send(feemanagement)
          .expect(200)
          .end(function (feemanagementSaveErr, feemanagementSaveRes) {
            // Handle Feemanagement save error
            if (feemanagementSaveErr) {
              return done(feemanagementSaveErr);
            }

            // Get a list of Feemanagements
            agent.get('/api/feemanagements')
              .end(function (feemanagementsGetErr, feemanagementsGetRes) {
                // Handle Feemanagements save error
                if (feemanagementsGetErr) {
                  return done(feemanagementsGetErr);
                }

                // Get Feemanagements list
                var feemanagements = feemanagementsGetRes.body;

                // Set assertions
                (feemanagements[0].user._id).should.equal(userId);
                (feemanagements[0].name).should.match('Feemanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Feemanagement if not logged in', function (done) {
    agent.post('/api/feemanagements')
      .send(feemanagement)
      .expect(403)
      .end(function (feemanagementSaveErr, feemanagementSaveRes) {
        // Call the assertion callback
        done(feemanagementSaveErr);
      });
  });

  it('should not be able to save an Feemanagement if no name is provided', function (done) {
    // Invalidate name field
    feemanagement.name = '';

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

        // Save a new Feemanagement
        agent.post('/api/feemanagements')
          .send(feemanagement)
          .expect(400)
          .end(function (feemanagementSaveErr, feemanagementSaveRes) {
            // Set message assertion
            (feemanagementSaveRes.body.message).should.match('Please fill Feemanagement name');

            // Handle Feemanagement save error
            done(feemanagementSaveErr);
          });
      });
  });

  it('should be able to update an Feemanagement if signed in', function (done) {
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

        // Save a new Feemanagement
        agent.post('/api/feemanagements')
          .send(feemanagement)
          .expect(200)
          .end(function (feemanagementSaveErr, feemanagementSaveRes) {
            // Handle Feemanagement save error
            if (feemanagementSaveErr) {
              return done(feemanagementSaveErr);
            }

            // Update Feemanagement name
            feemanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Feemanagement
            agent.put('/api/feemanagements/' + feemanagementSaveRes.body._id)
              .send(feemanagement)
              .expect(200)
              .end(function (feemanagementUpdateErr, feemanagementUpdateRes) {
                // Handle Feemanagement update error
                if (feemanagementUpdateErr) {
                  return done(feemanagementUpdateErr);
                }

                // Set assertions
                (feemanagementUpdateRes.body._id).should.equal(feemanagementSaveRes.body._id);
                (feemanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Feemanagements if not signed in', function (done) {
    // Create new Feemanagement model instance
    var feemanagementObj = new Feemanagement(feemanagement);

    // Save the feemanagement
    feemanagementObj.save(function () {
      // Request Feemanagements
      request(app).get('/api/feemanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Feemanagement if not signed in', function (done) {
    // Create new Feemanagement model instance
    var feemanagementObj = new Feemanagement(feemanagement);

    // Save the Feemanagement
    feemanagementObj.save(function () {
      request(app).get('/api/feemanagements/' + feemanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', feemanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Feemanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/feemanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Feemanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Feemanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Feemanagement
    request(app).get('/api/feemanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Feemanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Feemanagement if signed in', function (done) {
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

        // Save a new Feemanagement
        agent.post('/api/feemanagements')
          .send(feemanagement)
          .expect(200)
          .end(function (feemanagementSaveErr, feemanagementSaveRes) {
            // Handle Feemanagement save error
            if (feemanagementSaveErr) {
              return done(feemanagementSaveErr);
            }

            // Delete an existing Feemanagement
            agent.delete('/api/feemanagements/' + feemanagementSaveRes.body._id)
              .send(feemanagement)
              .expect(200)
              .end(function (feemanagementDeleteErr, feemanagementDeleteRes) {
                // Handle feemanagement error error
                if (feemanagementDeleteErr) {
                  return done(feemanagementDeleteErr);
                }

                // Set assertions
                (feemanagementDeleteRes.body._id).should.equal(feemanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Feemanagement if not signed in', function (done) {
    // Set Feemanagement user
    feemanagement.user = user;

    // Create new Feemanagement model instance
    var feemanagementObj = new Feemanagement(feemanagement);

    // Save the Feemanagement
    feemanagementObj.save(function () {
      // Try deleting Feemanagement
      request(app).delete('/api/feemanagements/' + feemanagementObj._id)
        .expect(403)
        .end(function (feemanagementDeleteErr, feemanagementDeleteRes) {
          // Set message assertion
          (feemanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Feemanagement error error
          done(feemanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Feemanagement that has an orphaned user reference', function (done) {
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

          // Save a new Feemanagement
          agent.post('/api/feemanagements')
            .send(feemanagement)
            .expect(200)
            .end(function (feemanagementSaveErr, feemanagementSaveRes) {
              // Handle Feemanagement save error
              if (feemanagementSaveErr) {
                return done(feemanagementSaveErr);
              }

              // Set assertions on new Feemanagement
              (feemanagementSaveRes.body.name).should.equal(feemanagement.name);
              should.exist(feemanagementSaveRes.body.user);
              should.equal(feemanagementSaveRes.body.user._id, orphanId);

              // force the Feemanagement to have an orphaned user reference
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

                    // Get the Feemanagement
                    agent.get('/api/feemanagements/' + feemanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (feemanagementInfoErr, feemanagementInfoRes) {
                        // Handle Feemanagement error
                        if (feemanagementInfoErr) {
                          return done(feemanagementInfoErr);
                        }

                        // Set assertions
                        (feemanagementInfoRes.body._id).should.equal(feemanagementSaveRes.body._id);
                        (feemanagementInfoRes.body.name).should.equal(feemanagement.name);
                        should.equal(feemanagementInfoRes.body.user, undefined);

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
      Feemanagement.remove().exec(done);
    });
  });
});
