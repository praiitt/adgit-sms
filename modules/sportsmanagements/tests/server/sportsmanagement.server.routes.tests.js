'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Sportsmanagement = mongoose.model('Sportsmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  sportsmanagement;

/**
 * Sportsmanagement routes tests
 */
describe('Sportsmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Sportsmanagement
    user.save(function () {
      sportsmanagement = {
        name: 'Sportsmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Sportsmanagement if logged in', function (done) {
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

        // Save a new Sportsmanagement
        agent.post('/api/sportsmanagements')
          .send(sportsmanagement)
          .expect(200)
          .end(function (sportsmanagementSaveErr, sportsmanagementSaveRes) {
            // Handle Sportsmanagement save error
            if (sportsmanagementSaveErr) {
              return done(sportsmanagementSaveErr);
            }

            // Get a list of Sportsmanagements
            agent.get('/api/sportsmanagements')
              .end(function (sportsmanagementsGetErr, sportsmanagementsGetRes) {
                // Handle Sportsmanagements save error
                if (sportsmanagementsGetErr) {
                  return done(sportsmanagementsGetErr);
                }

                // Get Sportsmanagements list
                var sportsmanagements = sportsmanagementsGetRes.body;

                // Set assertions
                (sportsmanagements[0].user._id).should.equal(userId);
                (sportsmanagements[0].name).should.match('Sportsmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Sportsmanagement if not logged in', function (done) {
    agent.post('/api/sportsmanagements')
      .send(sportsmanagement)
      .expect(403)
      .end(function (sportsmanagementSaveErr, sportsmanagementSaveRes) {
        // Call the assertion callback
        done(sportsmanagementSaveErr);
      });
  });

  it('should not be able to save an Sportsmanagement if no name is provided', function (done) {
    // Invalidate name field
    sportsmanagement.name = '';

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

        // Save a new Sportsmanagement
        agent.post('/api/sportsmanagements')
          .send(sportsmanagement)
          .expect(400)
          .end(function (sportsmanagementSaveErr, sportsmanagementSaveRes) {
            // Set message assertion
            (sportsmanagementSaveRes.body.message).should.match('Please fill Sportsmanagement name');

            // Handle Sportsmanagement save error
            done(sportsmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Sportsmanagement if signed in', function (done) {
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

        // Save a new Sportsmanagement
        agent.post('/api/sportsmanagements')
          .send(sportsmanagement)
          .expect(200)
          .end(function (sportsmanagementSaveErr, sportsmanagementSaveRes) {
            // Handle Sportsmanagement save error
            if (sportsmanagementSaveErr) {
              return done(sportsmanagementSaveErr);
            }

            // Update Sportsmanagement name
            sportsmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Sportsmanagement
            agent.put('/api/sportsmanagements/' + sportsmanagementSaveRes.body._id)
              .send(sportsmanagement)
              .expect(200)
              .end(function (sportsmanagementUpdateErr, sportsmanagementUpdateRes) {
                // Handle Sportsmanagement update error
                if (sportsmanagementUpdateErr) {
                  return done(sportsmanagementUpdateErr);
                }

                // Set assertions
                (sportsmanagementUpdateRes.body._id).should.equal(sportsmanagementSaveRes.body._id);
                (sportsmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Sportsmanagements if not signed in', function (done) {
    // Create new Sportsmanagement model instance
    var sportsmanagementObj = new Sportsmanagement(sportsmanagement);

    // Save the sportsmanagement
    sportsmanagementObj.save(function () {
      // Request Sportsmanagements
      request(app).get('/api/sportsmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Sportsmanagement if not signed in', function (done) {
    // Create new Sportsmanagement model instance
    var sportsmanagementObj = new Sportsmanagement(sportsmanagement);

    // Save the Sportsmanagement
    sportsmanagementObj.save(function () {
      request(app).get('/api/sportsmanagements/' + sportsmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', sportsmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Sportsmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/sportsmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Sportsmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Sportsmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Sportsmanagement
    request(app).get('/api/sportsmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Sportsmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Sportsmanagement if signed in', function (done) {
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

        // Save a new Sportsmanagement
        agent.post('/api/sportsmanagements')
          .send(sportsmanagement)
          .expect(200)
          .end(function (sportsmanagementSaveErr, sportsmanagementSaveRes) {
            // Handle Sportsmanagement save error
            if (sportsmanagementSaveErr) {
              return done(sportsmanagementSaveErr);
            }

            // Delete an existing Sportsmanagement
            agent.delete('/api/sportsmanagements/' + sportsmanagementSaveRes.body._id)
              .send(sportsmanagement)
              .expect(200)
              .end(function (sportsmanagementDeleteErr, sportsmanagementDeleteRes) {
                // Handle sportsmanagement error error
                if (sportsmanagementDeleteErr) {
                  return done(sportsmanagementDeleteErr);
                }

                // Set assertions
                (sportsmanagementDeleteRes.body._id).should.equal(sportsmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Sportsmanagement if not signed in', function (done) {
    // Set Sportsmanagement user
    sportsmanagement.user = user;

    // Create new Sportsmanagement model instance
    var sportsmanagementObj = new Sportsmanagement(sportsmanagement);

    // Save the Sportsmanagement
    sportsmanagementObj.save(function () {
      // Try deleting Sportsmanagement
      request(app).delete('/api/sportsmanagements/' + sportsmanagementObj._id)
        .expect(403)
        .end(function (sportsmanagementDeleteErr, sportsmanagementDeleteRes) {
          // Set message assertion
          (sportsmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Sportsmanagement error error
          done(sportsmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Sportsmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Sportsmanagement
          agent.post('/api/sportsmanagements')
            .send(sportsmanagement)
            .expect(200)
            .end(function (sportsmanagementSaveErr, sportsmanagementSaveRes) {
              // Handle Sportsmanagement save error
              if (sportsmanagementSaveErr) {
                return done(sportsmanagementSaveErr);
              }

              // Set assertions on new Sportsmanagement
              (sportsmanagementSaveRes.body.name).should.equal(sportsmanagement.name);
              should.exist(sportsmanagementSaveRes.body.user);
              should.equal(sportsmanagementSaveRes.body.user._id, orphanId);

              // force the Sportsmanagement to have an orphaned user reference
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

                    // Get the Sportsmanagement
                    agent.get('/api/sportsmanagements/' + sportsmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (sportsmanagementInfoErr, sportsmanagementInfoRes) {
                        // Handle Sportsmanagement error
                        if (sportsmanagementInfoErr) {
                          return done(sportsmanagementInfoErr);
                        }

                        // Set assertions
                        (sportsmanagementInfoRes.body._id).should.equal(sportsmanagementSaveRes.body._id);
                        (sportsmanagementInfoRes.body.name).should.equal(sportsmanagement.name);
                        should.equal(sportsmanagementInfoRes.body.user, undefined);

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
      Sportsmanagement.remove().exec(done);
    });
  });
});
