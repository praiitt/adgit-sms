'use strict';

/**
 * Module dependencies
 */
var feemanagementsPolicy = require('../policies/feemanagements.server.policy'),
  feemanagements = require('../controllers/feemanagements.server.controller');

module.exports = function(app) {
  // Feemanagements Routes
  app.route('/api/feemanagements').all(feemanagementsPolicy.isAllowed)
    .get(feemanagements.list)
    .post(feemanagements.create);

  app.route('/api/feemanagements/:feemanagementId').all(feemanagementsPolicy.isAllowed)
    .get(feemanagements.read)
    .put(feemanagements.update)
    .delete(feemanagements.delete);

  // Finish by binding the Feemanagement middleware
  app.param('feemanagementId', feemanagements.feemanagementByID);
};
