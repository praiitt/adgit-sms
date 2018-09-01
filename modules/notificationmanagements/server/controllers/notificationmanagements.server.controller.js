'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Notificationmanagement = mongoose.model('Notificationmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Notificationmanagement
 */
exports.create = function(req, res) {
  var notificationmanagement = new Notificationmanagement(req.body);
  notificationmanagement.user = req.user;

  notificationmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificationmanagement);
    }
  });
};

/**
 * Show the current Notificationmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var notificationmanagement = req.notificationmanagement ? req.notificationmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  notificationmanagement.isCurrentUserOwner = req.user && notificationmanagement.user && notificationmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(notificationmanagement);
};

/**
 * Update a Notificationmanagement
 */
exports.update = function(req, res) {
  var notificationmanagement = req.notificationmanagement;

  notificationmanagement = _.extend(notificationmanagement, req.body);

  notificationmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificationmanagement);
    }
  });
};

/**
 * Delete an Notificationmanagement
 */
exports.delete = function(req, res) {
  var notificationmanagement = req.notificationmanagement;

  notificationmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificationmanagement);
    }
  });
};

/**
 * List of Notificationmanagements
 */
exports.list = function(req, res) {
  Notificationmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, notificationmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificationmanagements);
    }
  });
};

/**
 * Notificationmanagement middleware
 */
exports.notificationmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Notificationmanagement is invalid'
    });
  }

  Notificationmanagement.findById(id).populate('user', 'displayName').exec(function (err, notificationmanagement) {
    if (err) {
      return next(err);
    } else if (!notificationmanagement) {
      return res.status(404).send({
        message: 'No Notificationmanagement with that identifier has been found'
      });
    }
    req.notificationmanagement = notificationmanagement;
    next();
  });
};
