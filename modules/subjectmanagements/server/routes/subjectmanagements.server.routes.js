'use strict';

/**
 * Module dependencies
 */
var subjectmanagementsPolicy = require('../policies/subjectmanagements.server.policy'),
  subjectmanagements = require('../controllers/subjectmanagements.server.controller');

module.exports = function(app) {
  // Subjectmanagements Routes
  app.route('/api/subjectmanagements').all(subjectmanagementsPolicy.isAllowed)
    .get(subjectmanagements.list)
    .post(subjectmanagements.create);

  app.route('/api/subjectmanagements/:subjectmanagementId').all(subjectmanagementsPolicy.isAllowed)
    .get(subjectmanagements.read)
    .put(subjectmanagements.update)
    .delete(subjectmanagements.delete);

  // Finish by binding the Subjectmanagement middleware
  app.param('subjectmanagementId', subjectmanagements.subjectmanagementByID);
};
