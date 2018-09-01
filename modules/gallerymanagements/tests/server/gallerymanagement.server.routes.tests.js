'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Gallerymanagement = mongoose.model('Gallerymanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  gallerymanagement;

/**
 * Gallerymanagement routes tests
 */
describe('Gallerymanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Gallerymanagement
    user.save(function () {
      gallerymanagement = {
        name: 'Gallerymanagement name'
      };

      done();
    });
  });

  it('should be able to save a Gallerymanagement if logged in', function (done) {
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

        // Save a new Gallerymanagement
        agent.post('/api/gallerymanagements')
          .send(gallerymanagement)
          .expect(200)
          .end(function (gallerymanagementSaveErr, gallerymanagementSaveRes) {
            // Handle Gallerymanagement save error
            if (gallerymanagementSaveErr) {
              return done(gallerymanagementSaveErr);
            }

            // Get a list of Gallerymanagements
            agent.get('/api/gallerymanagements')
              .end(function (gallerymanagementsGetErr, gallerymanagementsGetRes) {
                // Handle Gallerymanagements save error
                if (gallerymanagementsGetErr) {
                  return done(gallerymanagementsGetErr);
                }

                // Get Gallerymanagements list
                var gallerymanagements = gallerymanagementsGetRes.body;

                // Set assertions
                (gallerymanagements[0].user._id).should.equal(userId);
                (gallerymanagements[0].name).should.match('Gallerymanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Gallerymanagement if not logged in', function (done) {
    agent.post('/api/gallerymanagements')
      .send(gallerymanagement)
      .expect(403)
      .end(function (gallerymanagementSaveErr, gallerymanagementSaveRes) {
        // Call the assertion callback
        done(gallerymanagementSaveErr);
      });
  });

  it('should not be able to save an Gallerymanagement if no name is provided', function (done) {
    // Invalidate name field
    gallerymanagement.name = '';

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

        // Save a new Gallerymanagement
        agent.post('/api/gallerymanagements')
          .send(gallerymanagement)
          .expect(400)
          .end(function (gallerymanagementSaveErr, gallerymanagementSaveRes) {
            // Set message assertion
            (gallerymanagementSaveRes.body.message).should.match('Please fill Gallerymanagement name');

            // Handle Gallerymanagement save error
            done(gallerymanagementSaveErr);
          });
      });
  });

  it('should be able to update an Gallerymanagement if signed in', function (done) {
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

        // Save a new Gallerymanagement
        agent.post('/api/gallerymanagements')
          .send(gallerymanagement)
          .expect(200)
          .end(function (gallerymanagementSaveErr, gallerymanagementSaveRes) {
            // Handle Gallerymanagement save error
            if (gallerymanagementSaveErr) {
              return done(gallerymanagementSaveErr);
            }

            // Update Gallerymanagement name
            gallerymanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Gallerymanagement
            agent.put('/api/gallerymanagements/' + gallerymanagementSaveRes.body._id)
              .send(gallerymanagement)
              .expect(200)
              .end(function (gallerymanagementUpdateErr, gallerymanagementUpdateRes) {
                // Handle Gallerymanagement update error
                if (gallerymanagementUpdateErr) {
                  return done(gallerymanagementUpdateErr);
                }

                // Set assertions
                (gallerymanagementUpdateRes.body._id).should.equal(gallerymanagementSaveRes.body._id);
                (gallerymanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Gallerymanagements if not signed in', function (done) {
    // Create new Gallerymanagement model instance
    var gallerymanagementObj = new Gallerymanagement(gallerymanagement);

    // Save the gallerymanagement
    gallerymanagementObj.save(function () {
      // Request Gallerymanagements
      request(app).get('/api/gallerymanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Gallerymanagement if not signed in', function (done) {
    // Create new Gallerymanagement model instance
    var gallerymanagementObj = new Gallerymanagement(gallerymanagement);

    // Save the Gallerymanagement
    gallerymanagementObj.save(function () {
      request(app).get('/api/gallerymanagements/' + gallerymanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', gallerymanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Gallerymanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/gallerymanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Gallerymanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Gallerymanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Gallerymanagement
    request(app).get('/api/gallerymanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Gallerymanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Gallerymanagement if signed in', function (done) {
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

        // Save a new Gallerymanagement
        agent.post('/api/gallerymanagements')
          .send(gallerymanagement)
          .expect(200)
          .end(function (gallerymanagementSaveErr, gallerymanagementSaveRes) {
            // Handle Gallerymanagement save error
            if (gallerymanagementSaveErr) {
              return done(gallerymanagementSaveErr);
            }

            // Delete an existing Gallerymanagement
            agent.delete('/api/gallerymanagements/' + gallerymanagementSaveRes.body._id)
              .send(gallerymanagement)
              .expect(200)
              .end(function (gallerymanagementDeleteErr, gallerymanagementDeleteRes) {
                // Handle gallerymanagement error error
                if (gallerymanagementDeleteErr) {
                  return done(gallerymanagementDeleteErr);
                }

                // Set assertions
                (gallerymanagementDeleteRes.body._id).should.equal(gallerymanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Gallerymanagement if not signed in', function (done) {
    // Set Gallerymanagement user
    gallerymanagement.user = user;

    // Create new Gallerymanagement model instance
    var gallerymanagementObj = new Gallerymanagement(gallerymanagement);

    // Save the Gallerymanagement
    gallerymanagementObj.save(function () {
      // Try deleting Gallerymanagement
      request(app).delete('/api/gallerymanagements/' + gallerymanagementObj._id)
        .expect(403)
        .end(function (gallerymanagementDeleteErr, gallerymanagementDeleteRes) {
          // Set message assertion
          (gallerymanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Gallerymanagement error error
          done(gallerymanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Gallerymanagement that has an orphaned user reference', function (done) {
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

          // Save a new Gallerymanagement
          agent.post('/api/gallerymanagements')
            .send(gallerymanagement)
            .expect(200)
            .end(function (gallerymanagementSaveErr, gallerymanagementSaveRes) {
              // Handle Gallerymanagement save error
              if (gallerymanagementSaveErr) {
                return done(gallerymanagementSaveErr);
              }

              // Set assertions on new Gallerymanagement
              (gallerymanagementSaveRes.body.name).should.equal(gallerymanagement.name);
              should.exist(gallerymanagementSaveRes.body.user);
              should.equal(gallerymanagementSaveRes.body.user._id, orphanId);

              // force the Gallerymanagement to have an orphaned user reference
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

                    // Get the Gallerymanagement
                    agent.get('/api/gallerymanagements/' + gallerymanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (gallerymanagementInfoErr, gallerymanagementInfoRes) {
                        // Handle Gallerymanagement error
                        if (gallerymanagementInfoErr) {
                          return done(gallerymanagementInfoErr);
                        }

                        // Set assertions
                        (gallerymanagementInfoRes.body._id).should.equal(gallerymanagementSaveRes.body._id);
                        (gallerymanagementInfoRes.body.name).should.equal(gallerymanagement.name);
                        should.equal(gallerymanagementInfoRes.body.user, undefined);

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
      Gallerymanagement.remove().exec(done);
    });
  });
});
