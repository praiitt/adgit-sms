'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Admissionmanagement = mongoose.model('Admissionmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Admissionmanagement
 */
exports.create = function(req, res) {
  var admissionmanagement = new Admissionmanagement(req.body);
  admissionmanagement.user = req.user;

  admissionmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admissionmanagement);
    }
  });
};

/**
 * Show the current Admissionmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var admissionmanagement = req.admissionmanagement ? req.admissionmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  admissionmanagement.isCurrentUserOwner = req.user && admissionmanagement.user && admissionmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(admissionmanagement);
};

/**
 * Update a Admissionmanagement
 */
exports.update = function(req, res) {
  var admissionmanagement = req.admissionmanagement;

  admissionmanagement = _.extend(admissionmanagement, req.body);

  admissionmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admissionmanagement);
    }
  });
};

/**
 * Delete an Admissionmanagement
 */
exports.delete = function(req, res) {
  var admissionmanagement = req.admissionmanagement;

  admissionmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admissionmanagement);
    }
  });
};

/**
 * List of Admissionmanagements
 */
exports.list = function(req, res) {
  Admissionmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, admissionmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admissionmanagements);
    }
  });
};

/**
 * Admissionmanagement middleware
 */
exports.admissionmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Admissionmanagement is invalid'
    });
  }

  Admissionmanagement.findById(id).populate('user', 'displayName').exec(function (err, admissionmanagement) {
    if (err) {
      return next(err);
    } else if (!admissionmanagement) {
      return res.status(404).send({
        message: 'No Admissionmanagement with that identifier has been found'
      });
    }
    req.admissionmanagement = admissionmanagement;
    next();
  });
};
