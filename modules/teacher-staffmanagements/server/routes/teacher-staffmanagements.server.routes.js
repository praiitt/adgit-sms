'use strict';

/**
 * Module dependencies
 */
var teacherStaffmanagementsPolicy = require('../policies/teacher-staffmanagements.server.policy'),
  teacherStaffmanagements = require('../controllers/teacher-staffmanagements.server.controller');

module.exports = function(app) {
  // Teacher staffmanagements Routes
  app.route('/api/teacher-staffmanagements').all(teacherStaffmanagementsPolicy.isAllowed)
    .get(teacherStaffmanagements.list)
    .post(teacherStaffmanagements.create);

  app.route('/api/teacher-staffmanagements/:teacherStaffmanagementId').all(teacherStaffmanagementsPolicy.isAllowed)
    .get(teacherStaffmanagements.read)
    .put(teacherStaffmanagements.update)
    .delete(teacherStaffmanagements.delete);

  // Finish by binding the Teacher staffmanagement middleware
  app.param('teacherStaffmanagementId', teacherStaffmanagements.teacherStaffmanagementByID);
};
