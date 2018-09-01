// Teacher staffmanagements service used to communicate Teacher staffmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('teacher-staffmanagements')
    .factory('TeacherStaffmanagementsService', TeacherStaffmanagementsService);

  TeacherStaffmanagementsService.$inject = ['$resource'];

  function TeacherStaffmanagementsService($resource) {
    return $resource('api/teacher-staffmanagements/:teacherStaffmanagementId', {
      teacherStaffmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
