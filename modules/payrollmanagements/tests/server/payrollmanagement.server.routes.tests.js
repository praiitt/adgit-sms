'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Payrollmanagement = mongoose.model('Payrollmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  payrollmanagement;

/**
 * Payrollmanagement routes tests
 */
describe('Payrollmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Payrollmanagement
    user.save(function () {
      payrollmanagement = {
        name: 'Payrollmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Payrollmanagement if logged in', function (done) {
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

        // Save a new Payrollmanagement
        agent.post('/api/payrollmanagements')
          .send(payrollmanagement)
          .expect(200)
          .end(function (payrollmanagementSaveErr, payrollmanagementSaveRes) {
            // Handle Payrollmanagement save error
            if (payrollmanagementSaveErr) {
              return done(payrollmanagementSaveErr);
            }

            // Get a list of Payrollmanagements
            agent.get('/api/payrollmanagements')
              .end(function (payrollmanagementsGetErr, payrollmanagementsGetRes) {
                // Handle Payrollmanagements save error
                if (payrollmanagementsGetErr) {
                  return done(payrollmanagementsGetErr);
                }

                // Get Payrollmanagements list
                var payrollmanagements = payrollmanagementsGetRes.body;

                // Set assertions
                (payrollmanagements[0].user._id).should.equal(userId);
                (payrollmanagements[0].name).should.match('Payrollmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Payrollmanagement if not logged in', function (done) {
    agent.post('/api/payrollmanagements')
      .send(payrollmanagement)
      .expect(403)
      .end(function (payrollmanagementSaveErr, payrollmanagementSaveRes) {
        // Call the assertion callback
        done(payrollmanagementSaveErr);
      });
  });

  it('should not be able to save an Payrollmanagement if no name is provided', function (done) {
    // Invalidate name field
    payrollmanagement.name = '';

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

        // Save a new Payrollmanagement
        agent.post('/api/payrollmanagements')
          .send(payrollmanagement)
          .expect(400)
          .end(function (payrollmanagementSaveErr, payrollmanagementSaveRes) {
            // Set message assertion
            (payrollmanagementSaveRes.body.message).should.match('Please fill Payrollmanagement name');

            // Handle Payrollmanagement save error
            done(payrollmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Payrollmanagement if signed in', function (done) {
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

        // Save a new Payrollmanagement
        agent.post('/api/payrollmanagements')
          .send(payrollmanagement)
          .expect(200)
          .end(function (payrollmanagementSaveErr, payrollmanagementSaveRes) {
            // Handle Payrollmanagement save error
            if (payrollmanagementSaveErr) {
              return done(payrollmanagementSaveErr);
            }

            // Update Payrollmanagement name
            payrollmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Payrollmanagement
            agent.put('/api/payrollmanagements/' + payrollmanagementSaveRes.body._id)
              .send(payrollmanagement)
              .expect(200)
              .end(function (payrollmanagementUpdateErr, payrollmanagementUpdateRes) {
                // Handle Payrollmanagement update error
                if (payrollmanagementUpdateErr) {
                  return done(payrollmanagementUpdateErr);
                }

                // Set assertions
                (payrollmanagementUpdateRes.body._id).should.equal(payrollmanagementSaveRes.body._id);
                (payrollmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Payrollmanagements if not signed in', function (done) {
    // Create new Payrollmanagement model instance
    var payrollmanagementObj = new Payrollmanagement(payrollmanagement);

    // Save the payrollmanagement
    payrollmanagementObj.save(function () {
      // Request Payrollmanagements
      request(app).get('/api/payrollmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Payrollmanagement if not signed in', function (done) {
    // Create new Payrollmanagement model instance
    var payrollmanagementObj = new Payrollmanagement(payrollmanagement);

    // Save the Payrollmanagement
    payrollmanagementObj.save(function () {
      request(app).get('/api/payrollmanagements/' + payrollmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', payrollmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Payrollmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/payrollmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Payrollmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Payrollmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Payrollmanagement
    request(app).get('/api/payrollmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Payrollmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Payrollmanagement if signed in', function (done) {
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

        // Save a new Payrollmanagement
        agent.post('/api/payrollmanagements')
          .send(payrollmanagement)
          .expect(200)
          .end(function (payrollmanagementSaveErr, payrollmanagementSaveRes) {
            // Handle Payrollmanagement save error
            if (payrollmanagementSaveErr) {
              return done(payrollmanagementSaveErr);
            }

            // Delete an existing Payrollmanagement
            agent.delete('/api/payrollmanagements/' + payrollmanagementSaveRes.body._id)
              .send(payrollmanagement)
              .expect(200)
              .end(function (payrollmanagementDeleteErr, payrollmanagementDeleteRes) {
                // Handle payrollmanagement error error
                if (payrollmanagementDeleteErr) {
                  return done(payrollmanagementDeleteErr);
                }

                // Set assertions
                (payrollmanagementDeleteRes.body._id).should.equal(payrollmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Payrollmanagement if not signed in', function (done) {
    // Set Payrollmanagement user
    payrollmanagement.user = user;

    // Create new Payrollmanagement model instance
    var payrollmanagementObj = new Payrollmanagement(payrollmanagement);

    // Save the Payrollmanagement
    payrollmanagementObj.save(function () {
      // Try deleting Payrollmanagement
      request(app).delete('/api/payrollmanagements/' + payrollmanagementObj._id)
        .expect(403)
        .end(function (payrollmanagementDeleteErr, payrollmanagementDeleteRes) {
          // Set message assertion
          (payrollmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Payrollmanagement error error
          done(payrollmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Payrollmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Payrollmanagement
          agent.post('/api/payrollmanagements')
            .send(payrollmanagement)
            .expect(200)
            .end(function (payrollmanagementSaveErr, payrollmanagementSaveRes) {
              // Handle Payrollmanagement save error
              if (payrollmanagementSaveErr) {
                return done(payrollmanagementSaveErr);
              }

              // Set assertions on new Payrollmanagement
              (payrollmanagementSaveRes.body.name).should.equal(payrollmanagement.name);
              should.exist(payrollmanagementSaveRes.body.user);
              should.equal(payrollmanagementSaveRes.body.user._id, orphanId);

              // force the Payrollmanagement to have an orphaned user reference
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

                    // Get the Payrollmanagement
                    agent.get('/api/payrollmanagements/' + payrollmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (payrollmanagementInfoErr, payrollmanagementInfoRes) {
                        // Handle Payrollmanagement error
                        if (payrollmanagementInfoErr) {
                          return done(payrollmanagementInfoErr);
                        }

                        // Set assertions
                        (payrollmanagementInfoRes.body._id).should.equal(payrollmanagementSaveRes.body._id);
                        (payrollmanagementInfoRes.body.name).should.equal(payrollmanagement.name);
                        should.equal(payrollmanagementInfoRes.body.user, undefined);

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
      Payrollmanagement.remove().exec(done);
    });
  });
});
