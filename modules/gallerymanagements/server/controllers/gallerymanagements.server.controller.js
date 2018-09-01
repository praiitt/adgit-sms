'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Gallerymanagement = mongoose.model('Gallerymanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Gallerymanagement
 */
exports.create = function(req, res) {
  var gallerymanagement = new Gallerymanagement(req.body);
  gallerymanagement.user = req.user;

  gallerymanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gallerymanagement);
    }
  });
};

/**
 * Show the current Gallerymanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var gallerymanagement = req.gallerymanagement ? req.gallerymanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  gallerymanagement.isCurrentUserOwner = req.user && gallerymanagement.user && gallerymanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(gallerymanagement);
};

/**
 * Update a Gallerymanagement
 */
exports.update = function(req, res) {
  var gallerymanagement = req.gallerymanagement;

  gallerymanagement = _.extend(gallerymanagement, req.body);

  gallerymanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gallerymanagement);
    }
  });
};

/**
 * Delete an Gallerymanagement
 */
exports.delete = function(req, res) {
  var gallerymanagement = req.gallerymanagement;

  gallerymanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gallerymanagement);
    }
  });
};

/**
 * List of Gallerymanagements
 */
exports.list = function(req, res) {
  Gallerymanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, gallerymanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(gallerymanagements);
    }
  });
};

/**
 * Gallerymanagement middleware
 */
exports.gallerymanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Gallerymanagement is invalid'
    });
  }

  Gallerymanagement.findById(id).populate('user', 'displayName').exec(function (err, gallerymanagement) {
    if (err) {
      return next(err);
    } else if (!gallerymanagement) {
      return res.status(404).send({
        message: 'No Gallerymanagement with that identifier has been found'
      });
    }
    req.gallerymanagement = gallerymanagement;
    next();
  });
};
