'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Attendancemanagement = mongoose.model('Attendancemanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Attendancemanagement
 */
exports.create = function(req, res) {
  var attendancemanagement = new Attendancemanagement(req.body);
  attendancemanagement.user = req.user;

  attendancemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attendancemanagement);
    }
  });
};

/**
 * Show the current Attendancemanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var attendancemanagement = req.attendancemanagement ? req.attendancemanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  attendancemanagement.isCurrentUserOwner = req.user && attendancemanagement.user && attendancemanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(attendancemanagement);
};

/**
 * Update a Attendancemanagement
 */
exports.update = function(req, res) {
  var attendancemanagement = req.attendancemanagement;

  attendancemanagement = _.extend(attendancemanagement, req.body);

  attendancemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attendancemanagement);
    }
  });
};

/**
 * Delete an Attendancemanagement
 */
exports.delete = function(req, res) {
  var attendancemanagement = req.attendancemanagement;

  attendancemanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attendancemanagement);
    }
  });
};

/**
 * List of Attendancemanagements
 */
exports.list = function(req, res) {
  Attendancemanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, attendancemanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attendancemanagements);
    }
  });
};

/**
 * Attendancemanagement middleware
 */
exports.attendancemanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Attendancemanagement is invalid'
    });
  }

  Attendancemanagement.findById(id).populate('user', 'displayName').exec(function (err, attendancemanagement) {
    if (err) {
      return next(err);
    } else if (!attendancemanagement) {
      return res.status(404).send({
        message: 'No Attendancemanagement with that identifier has been found'
      });
    }
    req.attendancemanagement = attendancemanagement;
    next();
  });
};
