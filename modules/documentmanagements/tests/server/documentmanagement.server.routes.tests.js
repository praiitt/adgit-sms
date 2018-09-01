'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Documentmanagement = mongoose.model('Documentmanagement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  documentmanagement;

/**
 * Documentmanagement routes tests
 */
describe('Documentmanagement CRUD tests', function () {

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

    // Save a user to the test db and create new Documentmanagement
    user.save(function () {
      documentmanagement = {
        name: 'Documentmanagement name'
      };

      done();
    });
  });

  it('should be able to save a Documentmanagement if logged in', function (done) {
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

        // Save a new Documentmanagement
        agent.post('/api/documentmanagements')
          .send(documentmanagement)
          .expect(200)
          .end(function (documentmanagementSaveErr, documentmanagementSaveRes) {
            // Handle Documentmanagement save error
            if (documentmanagementSaveErr) {
              return done(documentmanagementSaveErr);
            }

            // Get a list of Documentmanagements
            agent.get('/api/documentmanagements')
              .end(function (documentmanagementsGetErr, documentmanagementsGetRes) {
                // Handle Documentmanagements save error
                if (documentmanagementsGetErr) {
                  return done(documentmanagementsGetErr);
                }

                // Get Documentmanagements list
                var documentmanagements = documentmanagementsGetRes.body;

                // Set assertions
                (documentmanagements[0].user._id).should.equal(userId);
                (documentmanagements[0].name).should.match('Documentmanagement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Documentmanagement if not logged in', function (done) {
    agent.post('/api/documentmanagements')
      .send(documentmanagement)
      .expect(403)
      .end(function (documentmanagementSaveErr, documentmanagementSaveRes) {
        // Call the assertion callback
        done(documentmanagementSaveErr);
      });
  });

  it('should not be able to save an Documentmanagement if no name is provided', function (done) {
    // Invalidate name field
    documentmanagement.name = '';

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

        // Save a new Documentmanagement
        agent.post('/api/documentmanagements')
          .send(documentmanagement)
          .expect(400)
          .end(function (documentmanagementSaveErr, documentmanagementSaveRes) {
            // Set message assertion
            (documentmanagementSaveRes.body.message).should.match('Please fill Documentmanagement name');

            // Handle Documentmanagement save error
            done(documentmanagementSaveErr);
          });
      });
  });

  it('should be able to update an Documentmanagement if signed in', function (done) {
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

        // Save a new Documentmanagement
        agent.post('/api/documentmanagements')
          .send(documentmanagement)
          .expect(200)
          .end(function (documentmanagementSaveErr, documentmanagementSaveRes) {
            // Handle Documentmanagement save error
            if (documentmanagementSaveErr) {
              return done(documentmanagementSaveErr);
            }

            // Update Documentmanagement name
            documentmanagement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Documentmanagement
            agent.put('/api/documentmanagements/' + documentmanagementSaveRes.body._id)
              .send(documentmanagement)
              .expect(200)
              .end(function (documentmanagementUpdateErr, documentmanagementUpdateRes) {
                // Handle Documentmanagement update error
                if (documentmanagementUpdateErr) {
                  return done(documentmanagementUpdateErr);
                }

                // Set assertions
                (documentmanagementUpdateRes.body._id).should.equal(documentmanagementSaveRes.body._id);
                (documentmanagementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Documentmanagements if not signed in', function (done) {
    // Create new Documentmanagement model instance
    var documentmanagementObj = new Documentmanagement(documentmanagement);

    // Save the documentmanagement
    documentmanagementObj.save(function () {
      // Request Documentmanagements
      request(app).get('/api/documentmanagements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Documentmanagement if not signed in', function (done) {
    // Create new Documentmanagement model instance
    var documentmanagementObj = new Documentmanagement(documentmanagement);

    // Save the Documentmanagement
    documentmanagementObj.save(function () {
      request(app).get('/api/documentmanagements/' + documentmanagementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', documentmanagement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Documentmanagement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/documentmanagements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Documentmanagement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Documentmanagement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Documentmanagement
    request(app).get('/api/documentmanagements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Documentmanagement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Documentmanagement if signed in', function (done) {
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

        // Save a new Documentmanagement
        agent.post('/api/documentmanagements')
          .send(documentmanagement)
          .expect(200)
          .end(function (documentmanagementSaveErr, documentmanagementSaveRes) {
            // Handle Documentmanagement save error
            if (documentmanagementSaveErr) {
              return done(documentmanagementSaveErr);
            }

            // Delete an existing Documentmanagement
            agent.delete('/api/documentmanagements/' + documentmanagementSaveRes.body._id)
              .send(documentmanagement)
              .expect(200)
              .end(function (documentmanagementDeleteErr, documentmanagementDeleteRes) {
                // Handle documentmanagement error error
                if (documentmanagementDeleteErr) {
                  return done(documentmanagementDeleteErr);
                }

                // Set assertions
                (documentmanagementDeleteRes.body._id).should.equal(documentmanagementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Documentmanagement if not signed in', function (done) {
    // Set Documentmanagement user
    documentmanagement.user = user;

    // Create new Documentmanagement model instance
    var documentmanagementObj = new Documentmanagement(documentmanagement);

    // Save the Documentmanagement
    documentmanagementObj.save(function () {
      // Try deleting Documentmanagement
      request(app).delete('/api/documentmanagements/' + documentmanagementObj._id)
        .expect(403)
        .end(function (documentmanagementDeleteErr, documentmanagementDeleteRes) {
          // Set message assertion
          (documentmanagementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Documentmanagement error error
          done(documentmanagementDeleteErr);
        });

    });
  });

  it('should be able to get a single Documentmanagement that has an orphaned user reference', function (done) {
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

          // Save a new Documentmanagement
          agent.post('/api/documentmanagements')
            .send(documentmanagement)
            .expect(200)
            .end(function (documentmanagementSaveErr, documentmanagementSaveRes) {
              // Handle Documentmanagement save error
              if (documentmanagementSaveErr) {
                return done(documentmanagementSaveErr);
              }

              // Set assertions on new Documentmanagement
              (documentmanagementSaveRes.body.name).should.equal(documentmanagement.name);
              should.exist(documentmanagementSaveRes.body.user);
              should.equal(documentmanagementSaveRes.body.user._id, orphanId);

              // force the Documentmanagement to have an orphaned user reference
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

                    // Get the Documentmanagement
                    agent.get('/api/documentmanagements/' + documentmanagementSaveRes.body._id)
                      .expect(200)
                      .end(function (documentmanagementInfoErr, documentmanagementInfoRes) {
                        // Handle Documentmanagement error
                        if (documentmanagementInfoErr) {
                          return done(documentmanagementInfoErr);
                        }

                        // Set assertions
                        (documentmanagementInfoRes.body._id).should.equal(documentmanagementSaveRes.body._id);
                        (documentmanagementInfoRes.body.name).should.equal(documentmanagement.name);
                        should.equal(documentmanagementInfoRes.body.user, undefined);

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
      Documentmanagement.remove().exec(done);
    });
  });
});
