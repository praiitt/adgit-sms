'use strict';

/**
 * Module dependencies
 */
var attaindancemanagementsPolicy = require('../policies/attaindancemanagements.server.policy'),
  attaindancemanagements = require('../controllers/attaindancemanagements.server.controller');

module.exports = function(app) {
  // Attaindancemanagements Routes
  app.route('/api/attaindancemanagements').all(attaindancemanagementsPolicy.isAllowed)
    .get(attaindancemanagements.list)
    .post(attaindancemanagements.create);

  app.route('/api/attaindancemanagements/:attaindancemanagementId').all(attaindancemanagementsPolicy.isAllowed)
    .get(attaindancemanagements.read)
    .put(attaindancemanagements.update)
    .delete(attaindancemanagements.delete);

  // Finish by binding the Attaindancemanagement middleware
  app.param('attaindancemanagementId', attaindancemanagements.attaindancemanagementByID);
};
