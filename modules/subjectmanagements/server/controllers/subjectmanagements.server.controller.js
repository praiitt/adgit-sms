'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Subjectmanagement = mongoose.model('Subjectmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Subjectmanagement
 */
exports.create = function(req, res) {
  var subjectmanagement = new Subjectmanagement(req.body);
  subjectmanagement.user = req.user;

  subjectmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subjectmanagement);
    }
  });
};

/**
 * Show the current Subjectmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var subjectmanagement = req.subjectmanagement ? req.subjectmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  subjectmanagement.isCurrentUserOwner = req.user && subjectmanagement.user && subjectmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(subjectmanagement);
};

/**
 * Update a Subjectmanagement
 */
exports.update = function(req, res) {
  var subjectmanagement = req.subjectmanagement;

  subjectmanagement = _.extend(subjectmanagement, req.body);

  subjectmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subjectmanagement);
    }
  });
};

/**
 * Delete an Subjectmanagement
 */
exports.delete = function(req, res) {
  var subjectmanagement = req.subjectmanagement;

  subjectmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subjectmanagement);
    }
  });
};

/**
 * List of Subjectmanagements
 */
exports.list = function(req, res) {
  Subjectmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, subjectmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subjectmanagements);
    }
  });
};

/**
 * Subjectmanagement middleware
 */
exports.subjectmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Subjectmanagement is invalid'
    });
  }

  Subjectmanagement.findById(id).populate('user', 'displayName').exec(function (err, subjectmanagement) {
    if (err) {
      return next(err);
    } else if (!subjectmanagement) {
      return res.status(404).send({
        message: 'No Subjectmanagement with that identifier has been found'
      });
    }
    req.subjectmanagement = subjectmanagement;
    next();
  });
};
