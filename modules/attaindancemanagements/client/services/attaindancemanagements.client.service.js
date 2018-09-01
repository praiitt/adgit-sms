// Attaindancemanagements service used to communicate Attaindancemanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('attaindancemanagements')
    .factory('AttaindancemanagementsService', AttaindancemanagementsService);

  AttaindancemanagementsService.$inject = ['$resource'];

  function AttaindancemanagementsService($resource) {
    return $resource('api/attaindancemanagements/:attaindancemanagementId', {
      attaindancemanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
