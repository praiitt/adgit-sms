// Studentmanagements service used to communicate Studentmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('studentmanagements')
    .factory('StudentmanagementsService', StudentmanagementsService);

  StudentmanagementsService.$inject = ['$resource'];

  function StudentmanagementsService($resource) {
    return $resource('api/studentmanagements/:studentmanagementId', {
      studentmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
