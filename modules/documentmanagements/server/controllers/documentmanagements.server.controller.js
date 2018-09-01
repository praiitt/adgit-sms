'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Documentmanagement = mongoose.model('Documentmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Documentmanagement
 */
exports.create = function(req, res) {
  var documentmanagement = new Documentmanagement(req.body);
  documentmanagement.user = req.user;

  documentmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(documentmanagement);
    }
  });
};

/**
 * Show the current Documentmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var documentmanagement = req.documentmanagement ? req.documentmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  documentmanagement.isCurrentUserOwner = req.user && documentmanagement.user && documentmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(documentmanagement);
};

/**
 * Update a Documentmanagement
 */
exports.update = function(req, res) {
  var documentmanagement = req.documentmanagement;

  documentmanagement = _.extend(documentmanagement, req.body);

  documentmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(documentmanagement);
    }
  });
};

/**
 * Delete an Documentmanagement
 */
exports.delete = function(req, res) {
  var documentmanagement = req.documentmanagement;

  documentmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(documentmanagement);
    }
  });
};

/**
 * List of Documentmanagements
 */
exports.list = function(req, res) {
  Documentmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, documentmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(documentmanagements);
    }
  });
};

/**
 * Documentmanagement middleware
 */
exports.documentmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Documentmanagement is invalid'
    });
  }

  Documentmanagement.findById(id).populate('user', 'displayName').exec(function (err, documentmanagement) {
    if (err) {
      return next(err);
    } else if (!documentmanagement) {
      return res.status(404).send({
        message: 'No Documentmanagement with that identifier has been found'
      });
    }
    req.documentmanagement = documentmanagement;
    next();
  });
};
