'use strict';

/**
 * Module dependencies
 */
var documentmanagementsPolicy = require('../policies/documentmanagements.server.policy'),
  documentmanagements = require('../controllers/documentmanagements.server.controller');

module.exports = function(app) {
  // Documentmanagements Routes
  app.route('/api/documentmanagements').all(documentmanagementsPolicy.isAllowed)
    .get(documentmanagements.list)
    .post(documentmanagements.create);

  app.route('/api/documentmanagements/:documentmanagementId').all(documentmanagementsPolicy.isAllowed)
    .get(documentmanagements.read)
    .put(documentmanagements.update)
    .delete(documentmanagements.delete);

  // Finish by binding the Documentmanagement middleware
  app.param('documentmanagementId', documentmanagements.documentmanagementByID);
};
