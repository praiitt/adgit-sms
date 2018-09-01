// Sportsmanagements service used to communicate Sportsmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('sportsmanagements')
    .factory('SportsmanagementsService', SportsmanagementsService);

  SportsmanagementsService.$inject = ['$resource'];

  function SportsmanagementsService($resource) {
    return $resource('api/sportsmanagements/:sportsmanagementId', {
      sportsmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
