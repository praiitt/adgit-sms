'use strict';

/**
 * Module dependencies
 */
var gallerymanagementsPolicy = require('../policies/gallerymanagements.server.policy'),
  gallerymanagements = require('../controllers/gallerymanagements.server.controller');

module.exports = function(app) {
  // Gallerymanagements Routes
  app.route('/api/gallerymanagements').all(gallerymanagementsPolicy.isAllowed)
    .get(gallerymanagements.list)
    .post(gallerymanagements.create);

  app.route('/api/gallerymanagements/:gallerymanagementId').all(gallerymanagementsPolicy.isAllowed)
    .get(gallerymanagements.read)
    .put(gallerymanagements.update)
    .delete(gallerymanagements.delete);

  // Finish by binding the Gallerymanagement middleware
  app.param('gallerymanagementId', gallerymanagements.gallerymanagementByID);
};
