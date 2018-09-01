// Gallerymanagements service used to communicate Gallerymanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('gallerymanagements')
    .factory('GallerymanagementsService', GallerymanagementsService);

  GallerymanagementsService.$inject = ['$resource'];

  function GallerymanagementsService($resource) {
    return $resource('api/gallerymanagements/:gallerymanagementId', {
      gallerymanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
