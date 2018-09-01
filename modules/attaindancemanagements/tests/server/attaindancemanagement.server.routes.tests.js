'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Attaindancemanagement = mongoose.model('Attaindancemanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  attaindancemanagement;

/**
 * Attaindancemanagement routes tests
 */
describe('Attaindancemanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Attaindancemanagement
    user.save(function () {
      attaindancemanagement = {
        name: 'Attaindancemanagement name'
      };

      done();
    });
  });

  it('should be able to save a Attaindancemanagement if logged in', function (done) {
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

        // Save a new Attaindancemanagement
        agent.post('/api/attaindancemanagements')
          .send(attaindancemanagement)
          .expect(200)
          .end(function (attaindancemanagementSaveErr, attaindancemanagementSaveRes) {
            // Handle Attaindancemanagement save error
            if (attaindancemanagementSaveErr) {
              return done(attaindancemanagementSaveErr);
            }

            // Get a list of Attaindancemanagements
            agent.get('/api/attaindancemanagements')
              .end(function (attaindancemanagementsGetErr, attaindancemanagementsGetRes) {
                // Handle Attaindancemanagements save error
                if (attaindancemanagementsGetErr) {
                  return done(attaindancemanagementsGetErr);
                }

                // Get Attaindancemanagements list
                var attaindancemanagements = attaindancemanagementsGetRes.body;

                // Set assertions
                (attaindancemanagements[0].user._id).should.equal(userId);
                (attaindancemanagements[0].name).should.match('Attaindancemanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Attaindancemanagement if not logged in', function (done) {
    agent.post('/api/attaindancemanagements')
      .send(attaindancemanagement)
      .expect(403)
      .end(function (attaindancemanagementSaveErr, attaindancemanagementSaveRes) {
        // Call the assertion callback
        done(attaindancemanagementSaveErr);
      });
  });

  it('should not be able to save an Attaindancemanagement if no name is provided', function (done) {
    // Invalidate name field
    attaindancemanagement.name = '';

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

        // Save a new Attaindancemanagement
        agent.post('/api/attaindancemanagements')
          .send(attaindancemanagement)
          .expect(400)
          .end(function (attaindancemanagementSaveErr, attaindancemanagementSaveRes) {
            // Set message assertion
            (attaindancemanagementSaveRes.body.message).should.match('Please fill Attaindancemanagement name');

            // Handle Attaindancemanagement save error
            done(attaindancemanagementSaveErr);
          });
      });
  });

  it('should be able to update an Attaindancemanagement if signed in', function (done) {
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

        // Save a new Attaindancemanagement
        agent.post('/api/attaindancemanagements')
          .send(attaindancemanagement)
          .expect(200)
          .end(function (attaindancemanagementSaveErr, attaindancemanagementSaveRes) {
            // Handle Attaindancemanagement save error
            if (attaindancemanagementSaveErr) {
              return done(attaindancemanagementSaveErr);
            }

            // Update Attaindancemanagement name
            attaindancemanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Attaindancemanagement
            agent.put('/api/attaindancemanagements/' + attaindancemanagementSaveRes.body._id)
              .send(attaindancemanagement)
              .expect(200)
              .end(function (attaindancemanagementUpdateErr, attaindancemanagementUpdateRes) {
                // Handle Attaindancemanagement update error
                if (attaindancemanagementUpdateErr) {
                  return done(attaindancemanagementUpdateErr);
                }

                // Set assertions
                (attaindancemanagementUpdateRes.body._id).should.equal(attaindancemanagementSaveRes.body._id);
                (attaindancemanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Attaindancemanagements if not signed in', function (done) {
    // Create new Attaindancemanagement model instance
    var attaindancemanagementObj = new Attaindancemanagement(attaindancemanagement);

    // Save the attaindancemanagement
    attaindancemanagementObj.save(function () {
      // Request Attaindancemanagements
      request(app).get('/api/attaindancemanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Attaindancemanagement if not signed in', function (done) {
    // Create new Attaindancemanagement model instance
    var attaindancemanagementObj = new Attaindancemanagement(attaindancemanagement);

    // Save the Attaindancemanagement
    attaindancemanagementObj.save(function () {
      request(app).get('/api/attaindancemanagements/' + attaindancemanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', attaindancemanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Attaindancemanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/attaindancemanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Attaindancemanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Attaindancemanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Attaindancemanagement
    request(app).get('/api/attaindancemanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Attaindancemanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Attaindancemanagement if signed in', function (done) {
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

        // Save a new Attaindancemanagement
        agent.post('/api/attaindancemanagements')
          .send(attaindancemanagement)
          .expect(200)
          .end(function (attaindancemanagementSaveErr, attaindancemanagementSaveRes) {
            // Handle Attaindancemanagement save error
            if (attaindancemanagementSaveErr) {
              return done(attaindancemanagementSaveErr);
            }

            // Delete an existing Attaindancemanagement
            agent.delete('/api/attaindancemanagements/' + attaindancemanagementSaveRes.body._id)
              .send(attaindancemanagement)
              .expect(200)
              .end(function (attaindancemanagementDeleteErr, attaindancemanagementDeleteRes) {
                // Handle attaindancemanagement error error
                if (attaindancemanagementDeleteErr) {
                  return done(attaindancemanagementDeleteErr);
                }

                // Set assertions
                (attaindancemanagementDeleteRes.body._id).should.equal(attaindancemanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Attaindancemanagement if not signed in', function (done) {
    // Set Attaindancemanagement user
    attaindancemanagement.user = user;

    // Create new Attaindancemanagement model instance
    var attaindancemanagementObj = new Attaindancemanagement(attaindancemanagement);

    // Save the Attaindancemanagement
    attaindancemanagementObj.save(function () {
      // Try deleting Attaindancemanagement
      request(app).delete('/api/attaindancemanagements/' + attaindancemanagementObj._id)
        .expect(403)
        .end(function (attaindancemanagementDeleteErr, attaindancemanagementDeleteRes) {
          // Set message assertion
          (attaindancemanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Attaindancemanagement error error
          done(attaindancemanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Attaindancemanagement that has an orphaned user reference', function (done) {
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

          // Save a new Attaindancemanagement
          agent.post('/api/attaindancemanagements')
            .send(attaindancemanagement)
            .expect(200)
            .end(function (attaindancemanagementSaveErr, attaindancemanagementSaveRes) {
              // Handle Attaindancemanagement save error
              if (attaindancemanagementSaveErr) {
                return done(attaindancemanagementSaveErr);
              }

              // Set assertions on new Attaindancemanagement
              (attaindancemanagementSaveRes.body.name).should.equal(attaindancemanagement.name);
              should.exist(attaindancemanagementSaveRes.body.user);
              should.equal(attaindancemanagementSaveRes.body.user._id, orphanId);

              // force the Attaindancemanagement to have an orphaned user reference
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

                    // Get the Attaindancemanagement
                    agent.get('/api/attaindancemanagements/' + attaindancemanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (attaindancemanagementInfoErr, attaindancemanagementInfoRes) {
                        // Handle Attaindancemanagement error
                        if (attaindancemanagementInfoErr) {
                          return done(attaindancemanagementInfoErr);
                        }

                        // Set assertions
                        (attaindancemanagementInfoRes.body._id).should.equal(attaindancemanagementSaveRes.body._id);
                        (attaindancemanagementInfoRes.body.name).should.equal(attaindancemanagement.name);
                        should.equal(attaindancemanagementInfoRes.body.user, undefined);

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
      Attaindancemanagement.remove().exec(done);
    });
  });
});
