'use strict';

/**
 * Module dependencies
 */
var sportsmanagementsPolicy = require('../policies/sportsmanagements.server.policy'),
  sportsmanagements = require('../controllers/sportsmanagements.server.controller');

module.exports = function(app) {
  // Sportsmanagements Routes
  app.route('/api/sportsmanagements').all(sportsmanagementsPolicy.isAllowed)
    .get(sportsmanagements.list)
    .post(sportsmanagements.create);

  app.route('/api/sportsmanagements/:sportsmanagementId').all(sportsmanagementsPolicy.isAllowed)
    .get(sportsmanagements.read)
    .put(sportsmanagements.update)
    .delete(sportsmanagements.delete);

  // Finish by binding the Sportsmanagement middleware
  app.param('sportsmanagementId', sportsmanagements.sportsmanagementByID);
};
