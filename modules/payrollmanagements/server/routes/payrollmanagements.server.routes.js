'use strict';

/**
 * Module dependencies
 */
var payrollmanagementsPolicy = require('../policies/payrollmanagements.server.policy'),
  payrollmanagements = require('../controllers/payrollmanagements.server.controller');

module.exports = function(app) {
  // Payrollmanagements Routes
  app.route('/api/payrollmanagements').all(payrollmanagementsPolicy.isAllowed)
    .get(payrollmanagements.list)
    .post(payrollmanagements.create);

  app.route('/api/payrollmanagements/:payrollmanagementId').all(payrollmanagementsPolicy.isAllowed)
    .get(payrollmanagements.read)
    .put(payrollmanagements.update)
    .delete(payrollmanagements.delete);

  // Finish by binding the Payrollmanagement middleware
  app.param('payrollmanagementId', payrollmanagements.payrollmanagementByID);
};
