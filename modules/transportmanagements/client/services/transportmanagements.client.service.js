// Transportmanagements service used to communicate Transportmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('transportmanagements')
    .factory('TransportmanagementsService', TransportmanagementsService);

  TransportmanagementsService.$inject = ['$resource'];

  function TransportmanagementsService($resource) {
    return $resource('api/transportmanagements/:transportmanagementId', {
      transportmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
