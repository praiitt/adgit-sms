'use strict';

/**
 * Module dependencies
 */
var admissionmanagementsPolicy = require('../policies/admissionmanagements.server.policy'),
  admissionmanagements = require('../controllers/admissionmanagements.server.controller');

module.exports = function(app) {
  // Admissionmanagements Routes
  app.route('/api/admissionmanagements')
    .get(admissionmanagements.list)
    .post(admissionmanagements.create);

  app.route('/api/admissionmanagements/:admissionmanagementId').all(admissionmanagementsPolicy.isAllowed)
    .get(admissionmanagements.read)
    .put(admissionmanagements.update)
    .delete(admissionmanagements.delete);

  // Finish by binding the Admissionmanagement middleware
  app.param('admissionmanagementId', admissionmanagements.admissionmanagementByID);
};
