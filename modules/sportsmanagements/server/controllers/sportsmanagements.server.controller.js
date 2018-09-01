'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Sportsmanagement = mongoose.model('Sportsmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Sportsmanagement
 */
exports.create = function(req, res) {
  var sportsmanagement = new Sportsmanagement(req.body);
  sportsmanagement.user = req.user;

  sportsmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sportsmanagement);
    }
  });
};

/**
 * Show the current Sportsmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var sportsmanagement = req.sportsmanagement ? req.sportsmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  sportsmanagement.isCurrentUserOwner = req.user && sportsmanagement.user && sportsmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(sportsmanagement);
};

/**
 * Update a Sportsmanagement
 */
exports.update = function(req, res) {
  var sportsmanagement = req.sportsmanagement;

  sportsmanagement = _.extend(sportsmanagement, req.body);

  sportsmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sportsmanagement);
    }
  });
};

/**
 * Delete an Sportsmanagement
 */
exports.delete = function(req, res) {
  var sportsmanagement = req.sportsmanagement;

  sportsmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sportsmanagement);
    }
  });
};

/**
 * List of Sportsmanagements
 */
exports.list = function(req, res) {
  Sportsmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, sportsmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sportsmanagements);
    }
  });
};

/**
 * Sportsmanagement middleware
 */
exports.sportsmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sportsmanagement is invalid'
    });
  }

  Sportsmanagement.findById(id).populate('user', 'displayName').exec(function (err, sportsmanagement) {
    if (err) {
      return next(err);
    } else if (!sportsmanagement) {
      return res.status(404).send({
        message: 'No Sportsmanagement with that identifier has been found'
      });
    }
    req.sportsmanagement = sportsmanagement;
    next();
  });
};
