'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Feemanagement = mongoose.model('Feemanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Feemanagement
 */
exports.create = function(req, res) {
  var feemanagement = new Feemanagement(req.body);
  feemanagement.user = req.user;

  feemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(feemanagement);
    }
  });
};

/**
 * Show the current Feemanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var feemanagement = req.feemanagement ? req.feemanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  feemanagement.isCurrentUserOwner = req.user && feemanagement.user && feemanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(feemanagement);
};

/**
 * Update a Feemanagement
 */
exports.update = function(req, res) {
  var feemanagement = req.feemanagement;

  feemanagement = _.extend(feemanagement, req.body);

  feemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(feemanagement);
    }
  });
};

/**
 * Delete an Feemanagement
 */
exports.delete = function(req, res) {
  var feemanagement = req.feemanagement;

  feemanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(feemanagement);
    }
  });
};

/**
 * List of Feemanagements
 */
exports.list = function(req, res) {
  Feemanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, feemanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(feemanagements);
    }
  });
};

/**
 * Feemanagement middleware
 */
exports.feemanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Feemanagement is invalid'
    });
  }

  Feemanagement.findById(id).populate('user', 'displayName').exec(function (err, feemanagement) {
    if (err) {
      return next(err);
    } else if (!feemanagement) {
      return res.status(404).send({
        message: 'No Feemanagement with that identifier has been found'
      });
    }
    req.feemanagement = feemanagement;
    next();
  });
};
