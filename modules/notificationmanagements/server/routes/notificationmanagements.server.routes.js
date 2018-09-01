'use strict';

/**
 * Module dependencies
 */
var notificationmanagementsPolicy = require('../policies/notificationmanagements.server.policy'),
  notificationmanagements = require('../controllers/notificationmanagements.server.controller');

module.exports = function(app) {
  // Notificationmanagements Routes
  app.route('/api/notificationmanagements').all(notificationmanagementsPolicy.isAllowed)
    .get(notificationmanagements.list)
    .post(notificationmanagements.create);

  app.route('/api/notificationmanagements/:notificationmanagementId').all(notificationmanagementsPolicy.isAllowed)
    .get(notificationmanagements.read)
    .put(notificationmanagements.update)
    .delete(notificationmanagements.delete);

  // Finish by binding the Notificationmanagement middleware
  app.param('notificationmanagementId', notificationmanagements.notificationmanagementByID);
};
