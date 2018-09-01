'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Admissionmanagement = mongoose.model('Admissionmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  admissionmanagement;

/**
 * Admissionmanagement routes tests
 */
describe('Admissionmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Admissionmanagement
    user.save(function () {
      admissionmanagement = {
        name: 'Admissionmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Admissionmanagement if logged in', function (done) {
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

        // Save a new Admissionmanagement
        agent.post('/api/admissionmanagements')
          .send(admissionmanagement)
          .expect(200)
          .end(function (admissionmanagementSaveErr, admissionmanagementSaveRes) {
            // Handle Admissionmanagement save error
            if (admissionmanagementSaveErr) {
              return done(admissionmanagementSaveErr);
            }

            // Get a list of Admissionmanagements
            agent.get('/api/admissionmanagements')
              .end(function (admissionmanagementsGetErr, admissionmanagementsGetRes) {
                // Handle Admissionmanagements save error
                if (admissionmanagementsGetErr) {
                  return done(admissionmanagementsGetErr);
                }

                // Get Admissionmanagements list
                var admissionmanagements = admissionmanagementsGetRes.body;

                // Set assertions
                (admissionmanagements[0].user._id).should.equal(userId);
                (admissionmanagements[0].name).should.match('Admissionmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Admissionmanagement if not logged in', function (done) {
    agent.post('/api/admissionmanagements')
      .send(admissionmanagement)
      .expect(403)
      .end(function (admissionmanagementSaveErr, admissionmanagementSaveRes) {
        // Call the assertion callback
        done(admissionmanagementSaveErr);
      });
  });

  it('should not be able to save an Admissionmanagement if no name is provided', function (done) {
    // Invalidate name field
    admissionmanagement.name = '';

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

        // Save a new Admissionmanagement
        agent.post('/api/admissionmanagements')
          .send(admissionmanagement)
          .expect(400)
          .end(function (admissionmanagementSaveErr, admissionmanagementSaveRes) {
            // Set message assertion
            (admissionmanagementSaveRes.body.message).should.match('Please fill Admissionmanagement name');

            // Handle Admissionmanagement save error
            done(admissionmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Admissionmanagement if signed in', function (done) {
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

        // Save a new Admissionmanagement
        agent.post('/api/admissionmanagements')
          .send(admissionmanagement)
          .expect(200)
          .end(function (admissionmanagementSaveErr, admissionmanagementSaveRes) {
            // Handle Admissionmanagement save error
            if (admissionmanagementSaveErr) {
              return done(admissionmanagementSaveErr);
            }

            // Update Admissionmanagement name
            admissionmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Admissionmanagement
            agent.put('/api/admissionmanagements/' + admissionmanagementSaveRes.body._id)
              .send(admissionmanagement)
              .expect(200)
              .end(function (admissionmanagementUpdateErr, admissionmanagementUpdateRes) {
                // Handle Admissionmanagement update error
                if (admissionmanagementUpdateErr) {
                  return done(admissionmanagementUpdateErr);
                }

                // Set assertions
                (admissionmanagementUpdateRes.body._id).should.equal(admissionmanagementSaveRes.body._id);
                (admissionmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Admissionmanagements if not signed in', function (done) {
    // Create new Admissionmanagement model instance
    var admissionmanagementObj = new Admissionmanagement(admissionmanagement);

    // Save the admissionmanagement
    admissionmanagementObj.save(function () {
      // Request Admissionmanagements
      request(app).get('/api/admissionmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Admissionmanagement if not signed in', function (done) {
    // Create new Admissionmanagement model instance
    var admissionmanagementObj = new Admissionmanagement(admissionmanagement);

    // Save the Admissionmanagement
    admissionmanagementObj.save(function () {
      request(app).get('/api/admissionmanagements/' + admissionmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', admissionmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Admissionmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/admissionmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Admissionmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Admissionmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Admissionmanagement
    request(app).get('/api/admissionmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Admissionmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Admissionmanagement if signed in', function (done) {
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

        // Save a new Admissionmanagement
        agent.post('/api/admissionmanagements')
          .send(admissionmanagement)
          .expect(200)
          .end(function (admissionmanagementSaveErr, admissionmanagementSaveRes) {
            // Handle Admissionmanagement save error
            if (admissionmanagementSaveErr) {
              return done(admissionmanagementSaveErr);
            }

            // Delete an existing Admissionmanagement
            agent.delete('/api/admissionmanagements/' + admissionmanagementSaveRes.body._id)
              .send(admissionmanagement)
              .expect(200)
              .end(function (admissionmanagementDeleteErr, admissionmanagementDeleteRes) {
                // Handle admissionmanagement error error
                if (admissionmanagementDeleteErr) {
                  return done(admissionmanagementDeleteErr);
                }

                // Set assertions
                (admissionmanagementDeleteRes.body._id).should.equal(admissionmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Admissionmanagement if not signed in', function (done) {
    // Set Admissionmanagement user
    admissionmanagement.user = user;

    // Create new Admissionmanagement model instance
    var admissionmanagementObj = new Admissionmanagement(admissionmanagement);

    // Save the Admissionmanagement
    admissionmanagementObj.save(function () {
      // Try deleting Admissionmanagement
      request(app).delete('/api/admissionmanagements/' + admissionmanagementObj._id)
        .expect(403)
        .end(function (admissionmanagementDeleteErr, admissionmanagementDeleteRes) {
          // Set message assertion
          (admissionmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Admissionmanagement error error
          done(admissionmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Admissionmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Admissionmanagement
          agent.post('/api/admissionmanagements')
            .send(admissionmanagement)
            .expect(200)
            .end(function (admissionmanagementSaveErr, admissionmanagementSaveRes) {
              // Handle Admissionmanagement save error
              if (admissionmanagementSaveErr) {
                return done(admissionmanagementSaveErr);
              }

              // Set assertions on new Admissionmanagement
              (admissionmanagementSaveRes.body.name).should.equal(admissionmanagement.name);
              should.exist(admissionmanagementSaveRes.body.user);
              should.equal(admissionmanagementSaveRes.body.user._id, orphanId);

              // force the Admissionmanagement to have an orphaned user reference
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

                    // Get the Admissionmanagement
                    agent.get('/api/admissionmanagements/' + admissionmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (admissionmanagementInfoErr, admissionmanagementInfoRes) {
                        // Handle Admissionmanagement error
                        if (admissionmanagementInfoErr) {
                          return done(admissionmanagementInfoErr);
                        }

                        // Set assertions
                        (admissionmanagementInfoRes.body._id).should.equal(admissionmanagementSaveRes.body._id);
                        (admissionmanagementInfoRes.body.name).should.equal(admissionmanagement.name);
                        should.equal(admissionmanagementInfoRes.body.user, undefined);

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
      Admissionmanagement.remove().exec(done);
    });
  });
});
