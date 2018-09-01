'use strict';

/**
 * Module dependencies
 */
var attendancemanagementsPolicy = require('../policies/attendancemanagements.server.policy'),
  attendancemanagements = require('../controllers/attendancemanagements.server.controller');

module.exports = function(app) {
  // Attendancemanagements Routes
  app.route('/api/attendancemanagements').all(attendancemanagementsPolicy.isAllowed)
    .get(attendancemanagements.list)
    .post(attendancemanagements.create);

  app.route('/api/attendancemanagements/:attendancemanagementId').all(attendancemanagementsPolicy.isAllowed)
    .get(attendancemanagements.read)
    .put(attendancemanagements.update)
    .delete(attendancemanagements.delete);

  // Finish by binding the Attendancemanagement middleware
  app.param('attendancemanagementId', attendancemanagements.attendancemanagementByID);
};
