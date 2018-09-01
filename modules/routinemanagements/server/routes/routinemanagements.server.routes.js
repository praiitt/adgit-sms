'use strict';

/**
 * Module dependencies
 */
var routinemanagementsPolicy = require('../policies/routinemanagements.server.policy'),
  routinemanagements = require('../controllers/routinemanagements.server.controller');

module.exports = function(app) {
  // Routinemanagements Routes
  app.route('/api/routinemanagements').all(routinemanagementsPolicy.isAllowed)
    .get(routinemanagements.list)
    .post(routinemanagements.create);

  app.route('/api/routinemanagements/:routinemanagementId').all(routinemanagementsPolicy.isAllowed)
    .get(routinemanagements.read)
    .put(routinemanagements.update)
    .delete(routinemanagements.delete);

  // Finish by binding the Routinemanagement middleware
  app.param('routinemanagementId', routinemanagements.routinemanagementByID);
};
