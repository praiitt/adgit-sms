// Feemanagements service used to communicate Feemanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('feemanagements')
    .factory('FeemanagementsService', FeemanagementsService);

  FeemanagementsService.$inject = ['$resource'];

  function FeemanagementsService($resource) {
    return $resource('api/feemanagements/:feemanagementId', {
      feemanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
