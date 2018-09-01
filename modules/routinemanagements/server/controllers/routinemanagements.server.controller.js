'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Routinemanagement = mongoose.model('Routinemanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Routinemanagement
 */
exports.create = function(req, res) {
  var routinemanagement = new Routinemanagement(req.body);
  routinemanagement.user = req.user;

  routinemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(routinemanagement);
    }
  });
};

/**
 * Show the current Routinemanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var routinemanagement = req.routinemanagement ? req.routinemanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  routinemanagement.isCurrentUserOwner = req.user && routinemanagement.user && routinemanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(routinemanagement);
};

/**
 * Update a Routinemanagement
 */
exports.update = function(req, res) {
  var routinemanagement = req.routinemanagement;

  routinemanagement = _.extend(routinemanagement, req.body);

  routinemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(routinemanagement);
    }
  });
};

/**
 * Delete an Routinemanagement
 */
exports.delete = function(req, res) {
  var routinemanagement = req.routinemanagement;

  routinemanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(routinemanagement);
    }
  });
};

/**
 * List of Routinemanagements
 */
exports.list = function(req, res) {
  Routinemanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, routinemanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(routinemanagements);
    }
  });
};

/**
 * Routinemanagement middleware
 */
exports.routinemanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Routinemanagement is invalid'
    });
  }

  Routinemanagement.findById(id).populate('user', 'displayName').exec(function (err, routinemanagement) {
    if (err) {
      return next(err);
    } else if (!routinemanagement) {
      return res.status(404).send({
        message: 'No Routinemanagement with that identifier has been found'
      });
    }
    req.routinemanagement = routinemanagement;
    next();
  });
};
