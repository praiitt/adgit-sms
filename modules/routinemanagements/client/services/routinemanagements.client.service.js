// Routinemanagements service used to communicate Routinemanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('routinemanagements')
    .factory('RoutinemanagementsService', RoutinemanagementsService);

  RoutinemanagementsService.$inject = ['$resource'];

  function RoutinemanagementsService($resource) {
    return $resource('api/routinemanagements/:routinemanagementId', {
      routinemanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
