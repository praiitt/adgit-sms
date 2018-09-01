'use strict';

/**
 * Module dependencies
 */
var leavemanagementsPolicy = require('../policies/leavemanagements.server.policy'),
  leavemanagements = require('../controllers/leavemanagements.server.controller');

module.exports = function(app) {
  // Leavemanagements Routes
  app.route('/api/leavemanagements').all(leavemanagementsPolicy.isAllowed)
    .get(leavemanagements.list)
    .post(leavemanagements.create);

  app.route('/api/leavemanagements/:leavemanagementId').all(leavemanagementsPolicy.isAllowed)
    .get(leavemanagements.read)
    .put(leavemanagements.update)
    .delete(leavemanagements.delete);

  // Finish by binding the Leavemanagement middleware
  app.param('leavemanagementId', leavemanagements.leavemanagementByID);
};
