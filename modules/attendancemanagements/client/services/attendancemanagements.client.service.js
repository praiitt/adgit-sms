// Attendancemanagements service used to communicate Attendancemanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('attendancemanagements')
    .factory('AttendancemanagementsService', AttendancemanagementsService);

  AttendancemanagementsService.$inject = ['$resource'];

  function AttendancemanagementsService($resource) {
    return $resource('api/attendancemanagements/:attendancemanagementId', {
      attendancemanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
