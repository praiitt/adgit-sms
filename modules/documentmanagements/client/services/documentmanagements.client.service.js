// Documentmanagements service used to communicate Documentmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('documentmanagements')
    .factory('DocumentmanagementsService', DocumentmanagementsService);

  DocumentmanagementsService.$inject = ['$resource'];

  function DocumentmanagementsService($resource) {
    return $resource('api/documentmanagements/:documentmanagementId', {
      documentmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
