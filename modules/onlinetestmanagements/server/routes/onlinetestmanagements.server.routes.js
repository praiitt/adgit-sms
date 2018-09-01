'use strict';

/**
 * Module dependencies
 */
var onlinetestmanagementsPolicy = require('../policies/onlinetestmanagements.server.policy'),
  onlinetestmanagements = require('../controllers/onlinetestmanagements.server.controller');

module.exports = function(app) {
  // Onlinetestmanagements Routes
  app.route('/api/onlinetestmanagements').all(onlinetestmanagementsPolicy.isAllowed)
    .get(onlinetestmanagements.list)
    .post(onlinetestmanagements.create);

  app.route('/api/onlinetestmanagements/:onlinetestmanagementId').all(onlinetestmanagementsPolicy.isAllowed)
    .get(onlinetestmanagements.read)
    .put(onlinetestmanagements.update)
    .delete(onlinetestmanagements.delete);

  // Finish by binding the Onlinetestmanagement middleware
  app.param('onlinetestmanagementId', onlinetestmanagements.onlinetestmanagementByID);
};
