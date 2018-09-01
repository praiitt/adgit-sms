'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Subjectmanagement = mongoose.model('Subjectmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  subjectmanagement;

/**
 * Subjectmanagement routes tests
 */
describe('Subjectmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Subjectmanagement
    user.save(function () {
      subjectmanagement = {
        name: 'Subjectmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Subjectmanagement if logged in', function (done) {
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

        // Save a new Subjectmanagement
        agent.post('/api/subjectmanagements')
          .send(subjectmanagement)
          .expect(200)
          .end(function (subjectmanagementSaveErr, subjectmanagementSaveRes) {
            // Handle Subjectmanagement save error
            if (subjectmanagementSaveErr) {
              return done(subjectmanagementSaveErr);
            }

            // Get a list of Subjectmanagements
            agent.get('/api/subjectmanagements')
              .end(function (subjectmanagementsGetErr, subjectmanagementsGetRes) {
                // Handle Subjectmanagements save error
                if (subjectmanagementsGetErr) {
                  return done(subjectmanagementsGetErr);
                }

                // Get Subjectmanagements list
                var subjectmanagements = subjectmanagementsGetRes.body;

                // Set assertions
                (subjectmanagements[0].user._id).should.equal(userId);
                (subjectmanagements[0].name).should.match('Subjectmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Subjectmanagement if not logged in', function (done) {
    agent.post('/api/subjectmanagements')
      .send(subjectmanagement)
      .expect(403)
      .end(function (subjectmanagementSaveErr, subjectmanagementSaveRes) {
        // Call the assertion callback
        done(subjectmanagementSaveErr);
      });
  });

  it('should not be able to save an Subjectmanagement if no name is provided', function (done) {
    // Invalidate name field
    subjectmanagement.name = '';

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

        // Save a new Subjectmanagement
        agent.post('/api/subjectmanagements')
          .send(subjectmanagement)
          .expect(400)
          .end(function (subjectmanagementSaveErr, subjectmanagementSaveRes) {
            // Set message assertion
            (subjectmanagementSaveRes.body.message).should.match('Please fill Subjectmanagement name');

            // Handle Subjectmanagement save error
            done(subjectmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Subjectmanagement if signed in', function (done) {
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

        // Save a new Subjectmanagement
        agent.post('/api/subjectmanagements')
          .send(subjectmanagement)
          .expect(200)
          .end(function (subjectmanagementSaveErr, subjectmanagementSaveRes) {
            // Handle Subjectmanagement save error
            if (subjectmanagementSaveErr) {
              return done(subjectmanagementSaveErr);
            }

            // Update Subjectmanagement name
            subjectmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Subjectmanagement
            agent.put('/api/subjectmanagements/' + subjectmanagementSaveRes.body._id)
              .send(subjectmanagement)
              .expect(200)
              .end(function (subjectmanagementUpdateErr, subjectmanagementUpdateRes) {
                // Handle Subjectmanagement update error
                if (subjectmanagementUpdateErr) {
                  return done(subjectmanagementUpdateErr);
                }

                // Set assertions
                (subjectmanagementUpdateRes.body._id).should.equal(subjectmanagementSaveRes.body._id);
                (subjectmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Subjectmanagements if not signed in', function (done) {
    // Create new Subjectmanagement model instance
    var subjectmanagementObj = new Subjectmanagement(subjectmanagement);

    // Save the subjectmanagement
    subjectmanagementObj.save(function () {
      // Request Subjectmanagements
      request(app).get('/api/subjectmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Subjectmanagement if not signed in', function (done) {
    // Create new Subjectmanagement model instance
    var subjectmanagementObj = new Subjectmanagement(subjectmanagement);

    // Save the Subjectmanagement
    subjectmanagementObj.save(function () {
      request(app).get('/api/subjectmanagements/' + subjectmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', subjectmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Subjectmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/subjectmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Subjectmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Subjectmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Subjectmanagement
    request(app).get('/api/subjectmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Subjectmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Subjectmanagement if signed in', function (done) {
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

        // Save a new Subjectmanagement
        agent.post('/api/subjectmanagements')
          .send(subjectmanagement)
          .expect(200)
          .end(function (subjectmanagementSaveErr, subjectmanagementSaveRes) {
            // Handle Subjectmanagement save error
            if (subjectmanagementSaveErr) {
              return done(subjectmanagementSaveErr);
            }

            // Delete an existing Subjectmanagement
            agent.delete('/api/subjectmanagements/' + subjectmanagementSaveRes.body._id)
              .send(subjectmanagement)
              .expect(200)
              .end(function (subjectmanagementDeleteErr, subjectmanagementDeleteRes) {
                // Handle subjectmanagement error error
                if (subjectmanagementDeleteErr) {
                  return done(subjectmanagementDeleteErr);
                }

                // Set assertions
                (subjectmanagementDeleteRes.body._id).should.equal(subjectmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Subjectmanagement if not signed in', function (done) {
    // Set Subjectmanagement user
    subjectmanagement.user = user;

    // Create new Subjectmanagement model instance
    var subjectmanagementObj = new Subjectmanagement(subjectmanagement);

    // Save the Subjectmanagement
    subjectmanagementObj.save(function () {
      // Try deleting Subjectmanagement
      request(app).delete('/api/subjectmanagements/' + subjectmanagementObj._id)
        .expect(403)
        .end(function (subjectmanagementDeleteErr, subjectmanagementDeleteRes) {
          // Set message assertion
          (subjectmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Subjectmanagement error error
          done(subjectmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Subjectmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Subjectmanagement
          agent.post('/api/subjectmanagements')
            .send(subjectmanagement)
            .expect(200)
            .end(function (subjectmanagementSaveErr, subjectmanagementSaveRes) {
              // Handle Subjectmanagement save error
              if (subjectmanagementSaveErr) {
                return done(subjectmanagementSaveErr);
              }

              // Set assertions on new Subjectmanagement
              (subjectmanagementSaveRes.body.name).should.equal(subjectmanagement.name);
              should.exist(subjectmanagementSaveRes.body.user);
              should.equal(subjectmanagementSaveRes.body.user._id, orphanId);

              // force the Subjectmanagement to have an orphaned user reference
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

                    // Get the Subjectmanagement
                    agent.get('/api/subjectmanagements/' + subjectmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (subjectmanagementInfoErr, subjectmanagementInfoRes) {
                        // Handle Subjectmanagement error
                        if (subjectmanagementInfoErr) {
                          return done(subjectmanagementInfoErr);
                        }

                        // Set assertions
                        (subjectmanagementInfoRes.body._id).should.equal(subjectmanagementSaveRes.body._id);
                        (subjectmanagementInfoRes.body.name).should.equal(subjectmanagement.name);
                        should.equal(subjectmanagementInfoRes.body.user, undefined);

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
      Subjectmanagement.remove().exec(done);
    });
  });
});
