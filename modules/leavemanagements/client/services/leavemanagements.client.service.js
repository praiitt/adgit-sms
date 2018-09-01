// Leavemanagements service used to communicate Leavemanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('leavemanagements')
    .factory('LeavemanagementsService', LeavemanagementsService);

  LeavemanagementsService.$inject = ['$resource'];

  function LeavemanagementsService($resource) {
    return $resource('api/leavemanagements/:leavemanagementId', {
      leavemanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
