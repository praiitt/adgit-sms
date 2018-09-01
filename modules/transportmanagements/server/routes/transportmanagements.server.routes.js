'use strict';

/**
 * Module dependencies
 */
var transportmanagementsPolicy = require('../policies/transportmanagements.server.policy'),
  transportmanagements = require('../controllers/transportmanagements.server.controller');

module.exports = function(app) {
  // Transportmanagements Routes
  app.route('/api/transportmanagements').all(transportmanagementsPolicy.isAllowed)
    .get(transportmanagements.list)
    .post(transportmanagements.create);

  app.route('/api/transportmanagements/:transportmanagementId').all(transportmanagementsPolicy.isAllowed)
    .get(transportmanagements.read)
    .put(transportmanagements.update)
    .delete(transportmanagements.delete);

  // Finish by binding the Transportmanagement middleware
  app.param('transportmanagementId', transportmanagements.transportmanagementByID);
};
