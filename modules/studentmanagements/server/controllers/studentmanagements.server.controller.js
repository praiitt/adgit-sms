'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Studentmanagement = mongoose.model('Studentmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Studentmanagement
 */
exports.create = function(req, res) {
  var studentmanagement = new Studentmanagement(req.body);
  studentmanagement.user = req.user;

  studentmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmanagement);
    }
  });
};

/**
 * Show the current Studentmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var studentmanagement = req.studentmanagement ? req.studentmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  studentmanagement.isCurrentUserOwner = req.user && studentmanagement.user && studentmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(studentmanagement);
};

/**
 * Update a Studentmanagement
 */
exports.update = function(req, res) {
  var studentmanagement = req.studentmanagement;

  studentmanagement = _.extend(studentmanagement, req.body);

  studentmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmanagement);
    }
  });
};

/**
 * Delete an Studentmanagement
 */
exports.delete = function(req, res) {
  var studentmanagement = req.studentmanagement;

  studentmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmanagement);
    }
  });
};

/**
 * List of Studentmanagements
 */
exports.list = function(req, res) {
  Studentmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, studentmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmanagements);
    }
  });
};

/**
 * Studentmanagement middleware
 */
exports.studentmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Studentmanagement is invalid'
    });
  }

  Studentmanagement.findById(id).populate('user', 'displayName').exec(function (err, studentmanagement) {
    if (err) {
      return next(err);
    } else if (!studentmanagement) {
      return res.status(404).send({
        message: 'No Studentmanagement with that identifier has been found'
      });
    }
    req.studentmanagement = studentmanagement;
    next();
  });
};
