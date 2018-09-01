'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Transportmanagement = mongoose.model('Transportmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Transportmanagement
 */
exports.create = function(req, res) {
  var transportmanagement = new Transportmanagement(req.body);
  transportmanagement.user = req.user;

  transportmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transportmanagement);
    }
  });
};

/**
 * Show the current Transportmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var transportmanagement = req.transportmanagement ? req.transportmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  transportmanagement.isCurrentUserOwner = req.user && transportmanagement.user && transportmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(transportmanagement);
};

/**
 * Update a Transportmanagement
 */
exports.update = function(req, res) {
  var transportmanagement = req.transportmanagement;

  transportmanagement = _.extend(transportmanagement, req.body);

  transportmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transportmanagement);
    }
  });
};

/**
 * Delete an Transportmanagement
 */
exports.delete = function(req, res) {
  var transportmanagement = req.transportmanagement;

  transportmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transportmanagement);
    }
  });
};

/**
 * List of Transportmanagements
 */
exports.list = function(req, res) {
  Transportmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, transportmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transportmanagements);
    }
  });
};

/**
 * Transportmanagement middleware
 */
exports.transportmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Transportmanagement is invalid'
    });
  }

  Transportmanagement.findById(id).populate('user', 'displayName').exec(function (err, transportmanagement) {
    if (err) {
      return next(err);
    } else if (!transportmanagement) {
      return res.status(404).send({
        message: 'No Transportmanagement with that identifier has been found'
      });
    }
    req.transportmanagement = transportmanagement;
    next();
  });
};
