'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Leavemanagement = mongoose.model('Leavemanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Leavemanagement
 */
exports.create = function(req, res) {
  var leavemanagement = new Leavemanagement(req.body);
  leavemanagement.user = req.user;

  leavemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(leavemanagement);
    }
  });
};

/**
 * Show the current Leavemanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var leavemanagement = req.leavemanagement ? req.leavemanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  leavemanagement.isCurrentUserOwner = req.user && leavemanagement.user && leavemanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(leavemanagement);
};

/**
 * Update a Leavemanagement
 */
exports.update = function(req, res) {
  var leavemanagement = req.leavemanagement;

  leavemanagement = _.extend(leavemanagement, req.body);

  leavemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(leavemanagement);
    }
  });
};

/**
 * Delete an Leavemanagement
 */
exports.delete = function(req, res) {
  var leavemanagement = req.leavemanagement;

  leavemanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(leavemanagement);
    }
  });
};

/**
 * List of Leavemanagements
 */
exports.list = function(req, res) {
  Leavemanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, leavemanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(leavemanagements);
    }
  });
};

/**
 * Leavemanagement middleware
 */
exports.leavemanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Leavemanagement is invalid'
    });
  }

  Leavemanagement.findById(id).populate('user', 'displayName').exec(function (err, leavemanagement) {
    if (err) {
      return next(err);
    } else if (!leavemanagement) {
      return res.status(404).send({
        message: 'No Leavemanagement with that identifier has been found'
      });
    }
    req.leavemanagement = leavemanagement;
    next();
  });
};
