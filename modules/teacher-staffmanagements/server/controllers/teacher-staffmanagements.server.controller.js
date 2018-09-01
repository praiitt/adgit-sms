'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TeacherStaffmanagement = mongoose.model('TeacherStaffmanagement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Teacher staffmanagement
 */
exports.create = function(req, res) {
  var teacherStaffmanagement = new TeacherStaffmanagement(req.body);
  teacherStaffmanagement.user = req.user;

  teacherStaffmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacherStaffmanagement);
    }
  });
};

/**
 * Show the current Teacher staffmanagement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var teacherStaffmanagement = req.teacherStaffmanagement ? req.teacherStaffmanagement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  teacherStaffmanagement.isCurrentUserOwner = req.user && teacherStaffmanagement.user && teacherStaffmanagement.user._id.toString() === req.user._id.toString();

  res.jsonp(teacherStaffmanagement);
};

/**
 * Update a Teacher staffmanagement
 */
exports.update = function(req, res) {
  var teacherStaffmanagement = req.teacherStaffmanagement;

  teacherStaffmanagement = _.extend(teacherStaffmanagement, req.body);

  teacherStaffmanagement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacherStaffmanagement);
    }
  });
};

/**
 * Delete an Teacher staffmanagement
 */
exports.delete = function(req, res) {
  var teacherStaffmanagement = req.teacherStaffmanagement;

  teacherStaffmanagement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacherStaffmanagement);
    }
  });
};

/**
 * List of Teacher staffmanagements
 */
exports.list = function(req, res) {
  TeacherStaffmanagement.find().sort('-created').populate('user', 'displayName').exec(function(err, teacherStaffmanagements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacherStaffmanagements);
    }
  });
};

/**
 * Teacher staffmanagement middleware
 */
exports.teacherStaffmanagementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Teacher staffmanagement is invalid'
    });
  }

  TeacherStaffmanagement.findById(id).populate('user', 'displayName').exec(function (err, teacherStaffmanagement) {
    if (err) {
      return next(err);
    } else if (!teacherStaffmanagement) {
      return res.status(404).send({
        message: 'No Teacher staffmanagement with that identifier has been found'
      });
    }
    req.teacherStaffmanagement = teacherStaffmanagement;
    next();
  });
};
