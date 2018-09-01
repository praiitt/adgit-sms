'use strict';

/**
 * Module dependencies
 */
var studentmanagementsPolicy = require('../policies/studentmanagements.server.policy'),
  studentmanagements = require('../controllers/studentmanagements.server.controller');

module.exports = function(app) {
  // Studentmanagements Routes
  app.route('/api/studentmanagements').all(studentmanagementsPolicy.isAllowed)
    .get(studentmanagements.list)
    .post(studentmanagements.create);

  app.route('/api/studentmanagements/:studentmanagementId').all(studentmanagementsPolicy.isAllowed)
    .get(studentmanagements.read)
    .put(studentmanagements.update)
    .delete(studentmanagements.delete);

  // Finish by binding the Studentmanagement middleware
  app.param('studentmanagementId', studentmanagements.studentmanagementByID);
};
