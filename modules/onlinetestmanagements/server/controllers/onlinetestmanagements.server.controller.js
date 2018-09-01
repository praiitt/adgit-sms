'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Onlinetestmanagement = mongoose.model('Onlinetestmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Onlinetestmanagement
 */
exports.create = function(req, res) {
  var onlinetestmanagement = new Onlinetestmanagement(req.body);
  onlinetestmanagement.user = req.user;

  onlinetestmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(onlinetestmanagement);
    }
  });
};

/**
 * Show the current Onlinetestmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var onlinetestmanagement = req.onlinetestmanagement ? req.onlinetestmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  onlinetestmanagement.isCurrentUserOwner = req.user && onlinetestmanagement.user && onlinetestmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(onlinetestmanagement);
};

/**
 * Update a Onlinetestmanagement
 */
exports.update = function(req, res) {
  var onlinetestmanagement = req.onlinetestmanagement;

  onlinetestmanagement = _.extend(onlinetestmanagement, req.body);

  onlinetestmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(onlinetestmanagement);
    }
  });
};

/**
 * Delete an Onlinetestmanagement
 */
exports.delete = function(req, res) {
  var onlinetestmanagement = req.onlinetestmanagement;

  onlinetestmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(onlinetestmanagement);
    }
  });
};

/**
 * List of Onlinetestmanagements
 */
exports.list = function(req, res) {
  Onlinetestmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, onlinetestmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(onlinetestmanagements);
    }
  });
};

/**
 * Onlinetestmanagement middleware
 */
exports.onlinetestmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Onlinetestmanagement is invalid'
    });
  }

  Onlinetestmanagement.findById(id).populate('user', 'displayName').exec(function (err, onlinetestmanagement) {
    if (err) {
      return next(err);
    } else if (!onlinetestmanagement) {
      return res.status(404).send({
        message: 'No Onlinetestmanagement with that identifier has been found'
      });
    }
    req.onlinetestmanagement = onlinetestmanagement;
    next();
  });
};
