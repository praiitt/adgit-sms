'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Payrollmanagement = mongoose.model('Payrollmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Payrollmanagement
 */
exports.create = function(req, res) {
  var payrollmanagement = new Payrollmanagement(req.body);
  payrollmanagement.user = req.user;

  payrollmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(payrollmanagement);
    }
  });
};

/**
 * Show the current Payrollmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var payrollmanagement = req.payrollmanagement ? req.payrollmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  payrollmanagement.isCurrentUserOwner = req.user && payrollmanagement.user && payrollmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(payrollmanagement);
};

/**
 * Update a Payrollmanagement
 */
exports.update = function(req, res) {
  var payrollmanagement = req.payrollmanagement;

  payrollmanagement = _.extend(payrollmanagement, req.body);

  payrollmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(payrollmanagement);
    }
  });
};

/**
 * Delete an Payrollmanagement
 */
exports.delete = function(req, res) {
  var payrollmanagement = req.payrollmanagement;

  payrollmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(payrollmanagement);
    }
  });
};

/**
 * List of Payrollmanagements
 */
exports.list = function(req, res) {
  Payrollmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, payrollmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(payrollmanagements);
    }
  });
};

/**
 * Payrollmanagement middleware
 */
exports.payrollmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Payrollmanagement is invalid'
    });
  }

  Payrollmanagement.findById(id).populate('user', 'displayName').exec(function (err, payrollmanagement) {
    if (err) {
      return next(err);
    } else if (!payrollmanagement) {
      return res.status(404).send({
        message: 'No Payrollmanagement with that identifier has been found'
      });
    }
    req.payrollmanagement = payrollmanagement;
    next();
  });
};
