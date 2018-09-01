'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Routinemanagement = mongoose.model('Routinemanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  routinemanagement;

/**
 * Routinemanagement routes tests
 */
describe('Routinemanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Routinemanagement
    user.save(function () {
      routinemanagement = {
        name: 'Routinemanagement name'
      };

      done();
    });
  });

  it('should be able to save a Routinemanagement if logged in', function (done) {
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

        // Save a new Routinemanagement
        agent.post('/api/routinemanagements')
          .send(routinemanagement)
          .expect(200)
          .end(function (routinemanagementSaveErr, routinemanagementSaveRes) {
            // Handle Routinemanagement save error
            if (routinemanagementSaveErr) {
              return done(routinemanagementSaveErr);
            }

            // Get a list of Routinemanagements
            agent.get('/api/routinemanagements')
              .end(function (routinemanagementsGetErr, routinemanagementsGetRes) {
                // Handle Routinemanagements save error
                if (routinemanagementsGetErr) {
                  return done(routinemanagementsGetErr);
                }

                // Get Routinemanagements list
                var routinemanagements = routinemanagementsGetRes.body;

                // Set assertions
                (routinemanagements[0].user._id).should.equal(userId);
                (routinemanagements[0].name).should.match('Routinemanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Routinemanagement if not logged in', function (done) {
    agent.post('/api/routinemanagements')
      .send(routinemanagement)
      .expect(403)
      .end(function (routinemanagementSaveErr, routinemanagementSaveRes) {
        // Call the assertion callback
        done(routinemanagementSaveErr);
      });
  });

  it('should not be able to save an Routinemanagement if no name is provided', function (done) {
    // Invalidate name field
    routinemanagement.name = '';

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

        // Save a new Routinemanagement
        agent.post('/api/routinemanagements')
          .send(routinemanagement)
          .expect(400)
          .end(function (routinemanagementSaveErr, routinemanagementSaveRes) {
            // Set message assertion
            (routinemanagementSaveRes.body.message).should.match('Please fill Routinemanagement name');

            // Handle Routinemanagement save error
            done(routinemanagementSaveErr);
          });
      });
  });

  it('should be able to update an Routinemanagement if signed in', function (done) {
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

        // Save a new Routinemanagement
        agent.post('/api/routinemanagements')
          .send(routinemanagement)
          .expect(200)
          .end(function (routinemanagementSaveErr, routinemanagementSaveRes) {
            // Handle Routinemanagement save error
            if (routinemanagementSaveErr) {
              return done(routinemanagementSaveErr);
            }

            // Update Routinemanagement name
            routinemanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Routinemanagement
            agent.put('/api/routinemanagements/' + routinemanagementSaveRes.body._id)
              .send(routinemanagement)
              .expect(200)
              .end(function (routinemanagementUpdateErr, routinemanagementUpdateRes) {
                // Handle Routinemanagement update error
                if (routinemanagementUpdateErr) {
                  return done(routinemanagementUpdateErr);
                }

                // Set assertions
                (routinemanagementUpdateRes.body._id).should.equal(routinemanagementSaveRes.body._id);
                (routinemanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Routinemanagements if not signed in', function (done) {
    // Create new Routinemanagement model instance
    var routinemanagementObj = new Routinemanagement(routinemanagement);

    // Save the routinemanagement
    routinemanagementObj.save(function () {
      // Request Routinemanagements
      request(app).get('/api/routinemanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Routinemanagement if not signed in', function (done) {
    // Create new Routinemanagement model instance
    var routinemanagementObj = new Routinemanagement(routinemanagement);

    // Save the Routinemanagement
    routinemanagementObj.save(function () {
      request(app).get('/api/routinemanagements/' + routinemanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', routinemanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Routinemanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/routinemanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Routinemanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Routinemanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Routinemanagement
    request(app).get('/api/routinemanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Routinemanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Routinemanagement if signed in', function (done) {
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

        // Save a new Routinemanagement
        agent.post('/api/routinemanagements')
          .send(routinemanagement)
          .expect(200)
          .end(function (routinemanagementSaveErr, routinemanagementSaveRes) {
            // Handle Routinemanagement save error
            if (routinemanagementSaveErr) {
              return done(routinemanagementSaveErr);
            }

            // Delete an existing Routinemanagement
            agent.delete('/api/routinemanagements/' + routinemanagementSaveRes.body._id)
              .send(routinemanagement)
              .expect(200)
              .end(function (routinemanagementDeleteErr, routinemanagementDeleteRes) {
                // Handle routinemanagement error error
                if (routinemanagementDeleteErr) {
                  return done(routinemanagementDeleteErr);
                }

                // Set assertions
                (routinemanagementDeleteRes.body._id).should.equal(routinemanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Routinemanagement if not signed in', function (done) {
    // Set Routinemanagement user
    routinemanagement.user = user;

    // Create new Routinemanagement model instance
    var routinemanagementObj = new Routinemanagement(routinemanagement);

    // Save the Routinemanagement
    routinemanagementObj.save(function () {
      // Try deleting Routinemanagement
      request(app).delete('/api/routinemanagements/' + routinemanagementObj._id)
        .expect(403)
        .end(function (routinemanagementDeleteErr, routinemanagementDeleteRes) {
          // Set message assertion
          (routinemanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Routinemanagement error error
          done(routinemanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Routinemanagement that has an orphaned user reference', function (done) {
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

          // Save a new Routinemanagement
          agent.post('/api/routinemanagements')
            .send(routinemanagement)
            .expect(200)
            .end(function (routinemanagementSaveErr, routinemanagementSaveRes) {
              // Handle Routinemanagement save error
              if (routinemanagementSaveErr) {
                return done(routinemanagementSaveErr);
              }

              // Set assertions on new Routinemanagement
              (routinemanagementSaveRes.body.name).should.equal(routinemanagement.name);
              should.exist(routinemanagementSaveRes.body.user);
              should.equal(routinemanagementSaveRes.body.user._id, orphanId);

              // force the Routinemanagement to have an orphaned user reference
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

                    // Get the Routinemanagement
                    agent.get('/api/routinemanagements/' + routinemanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (routinemanagementInfoErr, routinemanagementInfoRes) {
                        // Handle Routinemanagement error
                        if (routinemanagementInfoErr) {
                          return done(routinemanagementInfoErr);
                        }

                        // Set assertions
                        (routinemanagementInfoRes.body._id).should.equal(routinemanagementSaveRes.body._id);
                        (routinemanagementInfoRes.body.name).should.equal(routinemanagement.name);
                        should.equal(routinemanagementInfoRes.body.user, undefined);

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
      Routinemanagement.remove().exec(done);
    });
  });
});
