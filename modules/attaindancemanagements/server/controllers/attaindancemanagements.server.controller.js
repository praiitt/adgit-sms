'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Attaindancemanagement = mongoose.model('Attaindancemanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Attaindancemanagement
 */
exports.create = function(req, res) {
  var attaindancemanagement = new Attaindancemanagement(req.body);
  attaindancemanagement.user = req.user;

  attaindancemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attaindancemanagement);
    }
  });
};

/**
 * Show the current Attaindancemanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var attaindancemanagement = req.attaindancemanagement ? req.attaindancemanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  attaindancemanagement.isCurrentUserOwner = req.user && attaindancemanagement.user && attaindancemanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(attaindancemanagement);
};

/**
 * Update a Attaindancemanagement
 */
exports.update = function(req, res) {
  var attaindancemanagement = req.attaindancemanagement;

  attaindancemanagement = _.extend(attaindancemanagement, req.body);

  attaindancemanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attaindancemanagement);
    }
  });
};

/**
 * Delete an Attaindancemanagement
 */
exports.delete = function(req, res) {
  var attaindancemanagement = req.attaindancemanagement;

  attaindancemanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attaindancemanagement);
    }
  });
};

/**
 * List of Attaindancemanagements
 */
exports.list = function(req, res) {
  Attaindancemanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, attaindancemanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attaindancemanagements);
    }
  });
};

/**
 * Attaindancemanagement middleware
 */
exports.attaindancemanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Attaindancemanagement is invalid'
    });
  }

  Attaindancemanagement.findById(id).populate('user', 'displayName').exec(function (err, attaindancemanagement) {
    if (err) {
      return next(err);
    } else if (!attaindancemanagement) {
      return res.status(404).send({
        message: 'No Attaindancemanagement with that identifier has been found'
      });
    }
    req.attaindancemanagement = attaindancemanagement;
    next();
  });
};
